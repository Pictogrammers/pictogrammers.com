import { writeFile } from 'node:fs/promises';
import { graphql } from '@octokit/graphql';

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

const getAdditionalGitHubUserInfo = async (contributors) => {
  const usersQueries = contributors.reduce((output, contributor) => {
    // We are only concerned with contributors
    if (contributor.contributor) {
      output.push(`u${contributor.id.split('-')[0]}: user(login: "${contributor.github}") { avatarUrl, hasSponsorsListing }`);
    }
    return output;
  }, []);

  try {
    const request = await graphql(
      `query { ${usersQueries.join(',\n')} }`,
      {
        headers: {
          authorization: `token ${process.env.API_KEY_GITHUB}`
        }
      }
    );
    return request.data;
  } catch (err) {
    // The GraphQL implementation throws an error, but returns valid data
    // on the error object. We still want valid data, even if someone's
    // GitHub profile information changes.
    return err.data;
  }
};

const getContributors = async () => {
  console.log('INFO: Retrieving contributors from the API...');

  try {
    const codeContributors = await getCodeContributors();

    const res = await fetch('https://dev.materialdesignicons.com/api/user');

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

        // We're only concerned with contributors
        if (!rest.contributor) {
          return output;
        }

        // Shorten the contributor ID
        const contributorId = id.split('-')[0];
        rest.id = contributorId;

        // Add GitHub repos contributor has contributed to
        rest.contributedRepos = codeContributors[rest.github] || [];

        // Add additional profile information from GitHub
        rest.avatar = gitHubUserInfo[`u${contributorId}`]?.avatarUrl;
        rest.sponsorable = gitHubUserInfo[`u${contributorId}`]?.hasSponsorsListing;

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
