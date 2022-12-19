import fs from 'node:fs/promises';

import config from '../config.js';

const createJsName = (name, library) => {
  const iconPascal = name.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
  return `${library}${iconPascal}`;
};

const getIconLibraries = async () => {
  const { libraries: { icons: libraries } } = config;

  const processedLibraries = await libraries.reduce(async (prevPromise, library) => {
    const output = await prevPromise;

    const { default: { version: libraryVersion } } = await import(`${library.package}/package.json`, { assert: { type: 'json' } });
    const { default: libraryIcons } = await import(`${library.package}/meta.json`, { assert: { type: 'json' } });

    console.log(`INFO: Retrieving ${libraryIcons.length} icons for ${library.name} v${libraryVersion}...`);
    
    const icons = await Promise.all(libraryIcons.map(async (icon) => {
      // Add path data
      const iconSvgPath = await import.meta.resolve(`${library.package}/svg/${icon.name}.svg`);
      const svg = await fs.readFile(iconSvgPath.split('file://')[1], { encoding: 'utf8' });
      icon.path = svg.match(/ d="([^"]+)"/)[1];
    
      // Add jsName
      icon.jsName = createJsName(icon.name, library.id);

      return icon;
    }));

    output[library.id] = { icons, version: libraryVersion };
    return output;
  }, Promise.resolve({}));

  const allLibraries = await Object.keys(processedLibraries).reduce(async (prevPromise, libraryId) => {
    const output = await prevPromise;
    await fs.writeFile(`./public/libraries/${libraryId}.json`, JSON.stringify(processedLibraries[libraryId].icons), { flag: 'w' });

    const TEST_totalIcons = processedLibraries[libraryId].icons.length;
    const TEST_dexieExport = {
      formatName: 'dexie',
      formatVersion: 1,
      data: {
        databaseName: `pg-icons-${libraryId}`,
        databaseVersion: TEST_totalIcons,
        tables: [
          {
            name: 'icons',
            schema: 'id',
            rowCount: TEST_totalIcons
          }
        ],
        data: [
          {
            tableName: 'icons',
            inbound: true,
            rows: processedLibraries[libraryId].icons
          }
        ]
      }
    };
    await fs.writeFile(`./public/libraries/dexie-${libraryId}.json`, JSON.stringify(TEST_dexieExport), { flag: 'w' });

    output[libraryId] = Number(processedLibraries[libraryId].version.split('.').join(''));
    return output;
  }, Promise.resolve({}));

  await fs.writeFile('./public/libraries/libraries.json', JSON.stringify(allLibraries), { flag: 'w' });
};

export default getIconLibraries;