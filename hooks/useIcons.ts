import { useEffect, useState } from 'react';

import useDatabase from './useDatabase';

import { IconLibraryIcon } from '../interfaces/icons';

import allContributors from '../public/contributors/contributors.json';

interface FilterProps {
  author?: string;
  category?: string;
  term?: string;
  version?: string;
}

const useIcons = (libraryId: string, filter: FilterProps = {}) => {
  const database = useDatabase(libraryId);
  const [ visibleIcons, setVisibleIcons ] = useState([]);

  useEffect(() => {
    const getIcons = async () => {
      if (!database) {
        return;
      }

      let table = database.table('icons');

      if (filter.author) {
        const { contributors } = allContributors;
        const authorInfo = contributors.find((contributor) => contributor.github === filter.author);
        if (authorInfo) {
          table = table.where('a').equals(authorInfo.id);
        }
      }

      if (filter.category) {
        const catTable = await database.table('tags').where('slug').equals(filter.category).toArray();
        if (catTable.length === 1) {
          table = table.where('t').anyOf(catTable[0].id);
        }
      }

      if (filter.version) {
        table = table.where('v').equals(filter.version);
      }

      if (filter.term && filter?.term !== '') {
        const processedTerm = filter.term
          .replace(/([A-Z][a-z])/g,' $1') // Add a space in front of letters is Pascal-case is used
          .replace(/(\d+)/g,' $1') // Add a space in front of numbers if Pascal-case is used
          .replace(new RegExp(`(^${libraryId})`, 'gi'), '') // Remove a prefix of the library ID
          .toLowerCase()
          .split(/-| /) // Split into chuncks on spaces and dashes
          .filter((v: string) => v !== ''); // Filter out empty values

        table = table.filter((icon: IconLibraryIcon) => {
          // TODO: Finish this
          // table = table.filter((icon: IconLibraryIcon) => icon.st.some((terms) => terms.includes(processedTerm || '')));
          const iconSet = new Set(icon.st);
          const match = [...new Set(processedTerm)].filter((x) => iconSet.has(x));
          return icon.n === filter.term || !!match.length;
        });
      }
      
      const output = await table.toArray();
      setVisibleIcons(output);
    };

    getIcons();
  }, [
    database,
    filter.author,
    filter.category,
    filter.term,
    filter.version,
    libraryId
  ]);

  return visibleIcons;
};

export default useIcons;
