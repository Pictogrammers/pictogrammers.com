import fs from 'node:fs/promises';

import config from '../config.js';

const createJsName = (name, library) => {
  const iconPascal = name.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
  return `${library}${iconPascal}`;
};

const tokenizeIcon = (name, aliases = []) => {
  const nameTokens = name.split('-');

  const aliasTokens = aliases.reduce((output, alias) => {
    alias.split('-').forEach((alias) => {
      if (output.indexOf(alias) === -1 && nameTokens.indexOf(alias) === -1) {
        output.push(alias);
      }
    });
    return output;
  }, []);

  return [ ...nameTokens, ...aliasTokens ];
};

const getIconLibraries = async () => {
  const { libraries: { icons: libraries } } = config;

  const processedLibraries = await libraries.reduce(async (prevPromise, library) => {
    const output = await prevPromise;

    const { default: { version: libraryVersion } } = await import(`${library.package}/package.json`, { assert: { type: 'json' } });
    const { default: libraryIcons } = await import(`${library.package}/meta.json`, { assert: { type: 'json' } });

    console.log(`INFO: Retrieving ${libraryIcons.length} icons for ${library.name} v${libraryVersion}...`);
    
    const res = await fetch(`https://registry.npmjs.org/${library.package}`);
    const pkgData = await res.json();
    const releasedOn = pkgData.time[libraryVersion];

    const libraryData = await libraryIcons.reduce(async (prevPromise, icon) => {
      const output = await prevPromise;

      const {
        aliases,
        author,
        codepoint,
        id,
        name,
        tags,
        version
      } = icon;

      const thisIcon = {
        al: aliases,
        cp: codepoint,
        n: name,
        v: version
      };

      // Simplify authors
      const authorId = output.a.indexOf(author);
      thisIcon.a = authorId === -1 ? output.a.push(author) : authorId;

      // Simplify tags
      const tagIds = tags.map((tag) => {
        const tagId = output.t.indexOf(tag);
        return tagId === -1 ? output.t.push(tag) : tagId;
      });
      thisIcon.t = tagIds;

      // Add path data
      const iconSvgPath = await import.meta.resolve(`${library.package}/svg/${icon.name}.svg`);
      const svg = await fs.readFile(iconSvgPath.split('file://')[1], { encoding: 'utf8' });
      thisIcon.p = svg.match(/ d="([^"]+)"/)[1];

      // Add search tokens
      thisIcon.st = tokenizeIcon(icon.name, icon.aliases);

      output.i.push(thisIcon);
      return output;
    }, Promise.resolve({
      a: [], // Authors
      d: releasedOn, // Release Date
      i: [], // Icons
      t: [], // Tags
      v: libraryVersion // Version
    }));

    output[library.id] = libraryData;
    return output;
  }, Promise.resolve({}));

  const allLibraries = await Object.keys(processedLibraries).reduce(async (prevPromise, libraryId) => {
    const output = await prevPromise;
    await fs.writeFile(`./public/libraries/${libraryId}.json`, JSON.stringify(processedLibraries[libraryId]), { flag: 'w' });
    
    output[libraryId] = {
      count: Number(processedLibraries[libraryId].v.split('.').join('')),
      date: processedLibraries[libraryId].d.split('.')[0],
      version: processedLibraries[libraryId].v
    };
    return output;
  }, Promise.resolve({}));

  await fs.writeFile('./public/libraries/libraries.json', JSON.stringify(allLibraries), { flag: 'w' });
};

export default getIconLibraries;