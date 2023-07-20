import { IconLibraries } from '@/interfaces/icons';

const importLibraries = async () => {
  const librariesReq = await fetch('/data/libraries.json');
  const allLibraries = await librariesReq.json();

  const libraries = await Object.keys(allLibraries).reduce(async (prevPromise, libraryId) => {
    const output = await prevPromise;
    const { date: releaseDate, version } = allLibraries[libraryId as keyof typeof allLibraries];
    const libraryReq = await fetch(`/data/${libraryId}-${version}.json`, { cache: 'force-cache' });
    const fullLibrary = await libraryReq.json();
    const { i: icons, t: tags } = fullLibrary;
    output[libraryId] = { icons, releaseDate, tags, version };
    return output;
  }, Promise.resolve({}) as Promise<IconLibraries>);
  postMessage({ data: libraries, status: 'complete', type: 'libraries' });
};

const importDocSearchIndex = async () => {
  const docsReq = await fetch('/data/docs.json');
  const docIndex = await docsReq.json();
  postMessage({ data: docIndex, status: 'complete', type: 'docs' });
};

const importContributorSearchIndex = async () => {
  const contributorsReq = await fetch('/data/contributors.json');
  const contributorIndex = await contributorsReq.json();
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