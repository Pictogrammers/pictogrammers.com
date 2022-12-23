import { useEffect, useState } from 'react';

import useDatabase from './useDatabase';

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
    console.log('=>', filter.term);

    const getIcons = async () => {
      if (!database) {
        return;
      }

      const table = database.table('icons');

      // Probably going to need to do a transaction here: https://dexie.org/docs/API-Reference#query-items

      if (filter.term && filter?.term !== '') {
        const processedTerm = filter.term
          .replace(/([A-Z][a-z])/g,' $1') // Add a space in front of letters is Pascal-case is used
          .replace(/(\d+)/g,' $1') // Add a space in front of numbers if Pascal-case is used
          .replace(new RegExp(`(^${libraryId})`, 'gi'), '') // Remove a prefix of the library ID
          .split(/-| /) // Split into chuncks on spaces and dashes
          .filter((v: string) => v !== ''); // Filter out empty values

        const filtered = await table
          .where('n').equalsIgnoreCase(filter.term)
          .or('st').startsWithAnyOfIgnoreCase(processedTerm)
          .distinct()
          .toArray();

        setVisibleIcons(filtered);
        return;
      }
      
      const output = await table.orderBy('n').toArray();
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
