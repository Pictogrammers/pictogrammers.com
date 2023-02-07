import { IconLibraries } from '@/interfaces/icons';

const importLibraries = async () => {
  const { default: allLibraries } = await import('@/public/data/libraries.json');

  const libraries = await Object.keys(allLibraries).reduce(async (prevPromise, libraryId) => {
    const output = await prevPromise;
    const { date: releaseDate, version } = allLibraries[libraryId as keyof typeof allLibraries];
    const { default: fullLibrary } = await import(`@/public/data/${libraryId}-${version}.json`);
    const { i: icons, t: tags } = fullLibrary;
    output[libraryId] = { icons, releaseDate, tags, version };
    return output;
  }, Promise.resolve({}) as Promise<IconLibraries>);
  postMessage({ data: libraries, status: 'complete', type: 'libraries' });
};

const importDocSearchIndex = async () => {
  const { default: docIndex } = await import('@/public/data/docs.json');
  postMessage({ data: docIndex, status: 'complete', type: 'docs' });
};

const importContributorSearchIndex = async () => {
  const { default: contributorIndex } = await import('@/public/data/contributors.json');
  postMessage({ data: contributorIndex, status: 'complete', type: 'contributors' });
};

addEventListener('message', async (event) => {
  if (event.data !== 'load') {
    return;
  }

  try {
    await Promise.all([
      importLibraries(),
      importDocSearchIndex(),
      importContributorSearchIndex()
    ]);

    postMessage({ status: 'complete' });
  } catch (error) {
    postMessage({ error, status: 'error', type: 'libraries' });
  }
});