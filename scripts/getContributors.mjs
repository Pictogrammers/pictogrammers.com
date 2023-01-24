import fs  from 'fs';

const genericImage = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA2FBMVEUAAAB+V8J/WMKAWcOBWsOBW8OCXMSDXcSEX8WFYMWGYcaGYsaHY8aIZMeJZceKZsiLZ8iLaMiNa8mObMqPbcqQb8uRb8uXeM6Yec6bfdCegdGkidSojtaqkNesktixmtqznNu4ot2+quC+q+DAreHCr+LCsOLJuebLvOfQwunWyevWyuzYzO3azu3az+7b0O7h1/Hi2fHj2vLj2/Ll3fPp4vTp4/Xs5/bt6Pfu6ffv6/jw7Pjy7/nz8Pn08fr29Pv39Pv6+P37+v38+/78/P79/P7+/v////9zKY31AAABZUlEQVR42u3WW1OCQBjG8TZPUYGlEhpoecAo0/KMlQcUeb//N8oVAaeRK3acLp7n7u9e/GYY2eGCnWFAgAABAgQIECBAgAABAgRIUkRuT5YzSw1StWbLSVsWi5TnxLc2/DTW+5yXRSLygvxtyntyc8iFLBAxKViPZy9MUyAypmBulrGsG+ZYILKicAXGClGtBCI2BfMkxiQvTFsgYlGwAc9BmJZARHXoMJ2nHpSjCkRY9fCnbfrZ9GtTFfvGa12XvKEepD70yO1qwu+uXFE6TqmYwy0cv7RSustGmbkvKWmhiFbvTLf8Tfz6aDymGN/VO9F22qlrYhClZdPxFi8P/OfUm592S0mMZEyH/s57vd2dXAe2Y2aSIfkRndo3f0pPYY7ySZDLPp3ezw1jOTfM/mUCpEJxe96dTqOsJEBqsUh7d/oZZQ3IuRBjGbcG/2iJ0sAtDAQIECBAgAABAgQIECBA/i/yC65GvcXs6q8cAAAAAElFTkSuQmCC';

const getGitHubContributors = async () => {
  if (!process.env.API_KEY_GITHUB) {
    console.warn('WARNING: "API_KEY_GITHUB" not found. Skipping GitHub lookup for contributors.');
    return {};
  }

  try {
    const res = await fetch(`https://api.github.com/orgs/Pictogrammers/repos?Authorization=${process.env.API_KEY_GITHUB}&per_page=100`);

    if (!res.ok) {
      console.warn('WARNING: Unable to retrieve repository listing from Pictogrammers GitHub organization.');
      console.log(res);
      return {};
    }

    const repos = await res.json();
    return repos.reduce(async (prevPromise, repo) => {
      const output = await prevPromise;

      if (repo.private) {
        return output;
      }

      const repoRes = await fetch(`https://api.github.com/repos/Pictogrammers/${repo.name}/contributors?Authorization=${process.env.API_KEY_GITHUB}`);
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

const getContributors = async () => {
  console.log('info - Retrieving contributors from the API...');

  try {
    const gitHubContributors = await getGitHubContributors();

    const res = await fetch('https://dev.materialdesignicons.com/api/user');
  
    if (!res.ok) {
      console.error('ERROR: Unable to retrieve contributor listing.');
      process.exit(1);
    }
    
    const contributors = await res.json();

    if (!contributors.length) {
      console.log('warn - No contributors found, writing blank /public/contributors/contributors.json');
      return fs.writeFileSync('./public/contributors/contributors.json', JSON.stringify({ contributors: [], totalContributors: 0 }), { flag: 'w' });
    }

    const processedContributors = contributors
      .reduce((output, contributor) => {
        const { base64, description, id, website, ...rest } = contributor;

        // Add GitHub repos contributor has contributed to
        rest.contributedRepos = gitHubContributors[rest.github] || [];

        if (rest.iconCount === 0 && !rest.contributedRepos.length && !rest.core) {
          // No icons, no github contributions, and not core, omit user
          return output;
        }

        const contributorId = id.split('-')[0];
        rest.id = contributorId;

        // Filter out generic images
        if (base64 !== genericImage) {
          const imagePath = `/contributors/${contributorId}.jpg`;
          fs.writeFileSync(`./public${imagePath}`, contributor.base64, { encoding: 'base64', flag: 'w' });
          rest.image = true;
        }

        // Remove generically filled websites
        if (website !== `https://github.com/${rest.github}`) {
          rest.website = website;
        }

        // Blank out placeholder descriptions
        rest.description = description.toLowerCase().includes('placeholder') ? '' : description;

        output.push(rest);
        return output;
      }, [])
      .sort((a, b) => Number(b.core) - Number(a.core) || b.iconCount - a.iconCount);

    console.log(`info - Writing ${processedContributors.length} contributors to /public/contributors/contributors.json`);
    fs.writeFileSync('./public/contributors/contributors.json', JSON.stringify({ contributors: processedContributors, totalContributors: processedContributors.length }), { flag: 'w' });
    return processedContributors;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default getContributors;
