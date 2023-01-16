import { IconLibraries } from '../interfaces/icons';

interface LibraryDirectory {
  default: {
    [key: string]: {
      date: string;
      count: number;
      version: string;
    };
  }
}

const importLibraries = async () => {
  const { default: allLibraries } = await import('../public/libraries/libraries.json') as LibraryDirectory;

  const libraries = await Object.keys(allLibraries).reduce(async (prevPromise, libraryId) => {
    const output = await prevPromise;
    const { date: releaseDate, version } = allLibraries[libraryId];
    const { default: fullLibrary } = await import(`../public/libraries/${libraryId}-${version}.json`);
    const { i: icons, t: tags } = fullLibrary;
    output[libraryId] = { icons, releaseDate, tags, version };
    return output;
  }, Promise.resolve({}) as Promise<IconLibraries>);
  postMessage({ data: libraries, status: 'complete', type: 'libraries' });
};

addEventListener('message', async (event) => {
  if (event.data !== 'load') {
    return;
  }

  try {
    await importLibraries();

    postMessage({ status: 'complete' });
  } catch (error) {
    postMessage({ error, status: 'error', type: 'libraries' });
  }
});