import { writeFile } from 'node:fs/promises';
import { graphql } from '@octokit/graphql';

import config from '../config.js';

// We use the GitHub REST API here because it's impossible to get a
// repository's contributors via the GraphQL API at this time.
const getCodeContributors = async () => {
  if (!process.env.API_KEY_GITHUB) {
    console.warn('WARNING: "API_KEY_GITHUB" not found. Skipping GitHub lookup for code contributors.');
    return {};
  }

  try {
    const res = await fetch('https://api.github.com/orgs/Pictogrammers/repos?per_page=100', {
      headers: {
        authorization: `token ${process.env.API_KEY_GITHUB}`
      }
    });

    if (!res.ok) {
      console.warn('WARNING: Unable to retrieve repository listing from Pictogrammers GitHub organization.');
      return {};
    }

    const repos = await res.json();
    return repos.reduce(async (prevPromise, repo) => {
      const output = await prevPromise;

      if (repo.private) {
        return output;
      }

      const repoRes = await fetch(`https://api.github.com/repos/Pictogrammers/${repo.name}/contributors`, {
        headers: {
          authorization: `token ${process.env.API_KEY_GITHUB}`
        }
      });
      if (!repoRes.ok) {
        console.warn(`WARNING: Unable to retrieve contributors from '${repo.full_name}' repository.`);
        return output;
      }

      const contributors = await repoRes.json();

      contributors.forEach((contributor) => {
        if (contributor.login.includes('[bot]')) {
          return;
        }
        if (!output[contributor.login]) {
          output[contributor.login] = [];
        }
        if (repo.name !== '.github' && !output[contributor.login].find((r) => r === repo.name)) {
          output[contributor.login].push(repo.name);
        }
      });

      return output;
    }, Promise.resolve({}));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const runGitHubGraphQLQuery = async (query) => {
  try {
    const request = await graphql(query, {
      headers: {
        authorization: `token ${process.env.API_KEY_GITHUB}`
      }
    });
    return request.data;
  } catch (err) {
    // If any of the queries we attempt to run return null, the GraphQL
    // implementation throws an error. However, all valid data is found on
    // `err.data`. Therefore, we return that.
    return err.data;
  }
};

const getAdditionalGitHubUserInfo = async (contributors) => {
  const usersQueries = contributors.map((contributor) => `u${contributor.id.split('-')[0]}: user(login: "${contributor.github}") { avatarUrl, hasSponsorsListing }`);
  const userResults = await runGitHubGraphQLQuery(`query { ${usersQueries.join(',\n')} }`);

  // Check for null results, if any user doesn't exist,
  // we'll check to see if it's an organization name instead.
  const nullQuery = Object.keys(userResults).reduce((output, contributorId) => {
    if (userResults[contributorId] === null) {
      const contributorInfo = contributors.find((contributor) => `u${contributor.id.split('-')[0]}` === contributorId);
      output.push(`${contributorId}: organization(login: "${contributorInfo.github}") { avatarUrl, hasSponsorsListing }`);
    }
    return output;
  }, []);

  if (nullQuery.length) {
    const orgResults = await runGitHubGraphQLQuery(`query { ${nullQuery.join(',\n')} }`);
    return { ...userResults, ...orgResults };
  }

  return userResults;
};

const getContributors = async () => {
  console.log('INFO: Retrieving contributors from the API...');

  try {
    const codeContributors = await getCodeContributors();

    const res = await fetch(`${config.apiBase}/users?contributors=true`);

    if (!res.ok) {
      console.error('ERROR: Unable to retrieve contributor listing.');
      process.exit(1);
    }

    const contributors = await res.json();

    if (!contributors.length) {
      console.warn('WARN: No contributors found, writing blank /public/contributors/contributors.json');
      return writeFile('./public/data/contributors.json', JSON.stringify({ contributors: [], totalContributors: 0 }), { flag: 'w' });
    }

    const gitHubUserInfo = await getAdditionalGitHubUserInfo(contributors);

    const processedContributors = await contributors
      .reduce(async (prevPromise, contributor) => {
        const output = await prevPromise;
        const { id, ...rest } = contributor;

        // Shorten the contributor ID
        const contributorId = id.split('-')[0];
        rest.id = contributorId;

        // Add GitHub repos contributor has contributed to
        rest.contributedRepos = codeContributors[rest.github] || [];

        // Add additional profile information from GitHub
        rest.avatar = gitHubUserInfo[`u${contributorId}`]?.avatarUrl;
        rest.sponsorable = gitHubUserInfo[`u${contributorId}`]?.hasSponsorsListing;

        // Normalize data
        rest.links = rest.links === null ? [] : rest.links;

        output.push(rest);
        return output;
      }, Promise.resolve([]));

    const sortedContributors = processedContributors.sort((a, b) => Number(b.core) - Number(a.core) || b.iconCount - a.iconCount);

    console.log(`INFO: Writing ${sortedContributors.length} contributors to /public/data/contributors.json...`);
    await writeFile('./public/data/contributors.json', JSON.stringify({ contributors: sortedContributors, totalContributors: sortedContributors.length }), { flag: 'w' });
    return sortedContributors;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default getContributors;
