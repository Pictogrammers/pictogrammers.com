
import fs from 'node:fs/promises';
import Fuse from 'fuse.js';

const generateSearchIndex = async ({ iconLibraries }) => {
  // Icon Libraries
  const allIcons = Object.keys(iconLibraries).reduce((output, libraryId) => {
    const icons = iconLibraries[libraryId].i.map((icon) => {
      return { library: libraryId, name: icon.n, terms: icon.st, type: 'icon' };
    });
    return [...output, ...icons];
  }, []);

  // Icon Library Categories
  const allIconCategories = Object.keys(iconLibraries).reduce((output, libraryId) => {
    const icons = iconLibraries[libraryId].t.map((category) => {
      const catTerms = category.toLowerCase().split(/[^A-Za-z]/).filter((t) => t !== '');
      return { library: libraryId, name: category, terms: catTerms, type: 'category' };
    });
    return [...output, ...icons];
  }, []);

  const allSearchables = [...allIcons, ...allIconCategories];

  const searchIndex = Fuse.createIndex(['name', 'terms', 'library'], allSearchables);
  await fs.writeFile('./public/searchIndex.json', JSON.stringify(searchIndex), { flag: 'w' });

  return null;
};

export default generateSearchIndex;
