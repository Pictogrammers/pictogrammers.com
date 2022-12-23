import { useEffect, useState } from 'react';

import useDatabase from './useDatabase';

export interface CategoryProps {
  [key: string]: {
    id: number;
    name: string;
    slug: string;
  }
}

const useCategories = (libraryId: string) => {
  const database = useDatabase(libraryId);
  const [ categories, setCategories ] = useState<CategoryProps>();

  useEffect(() => {
    const getCategories = async () => {
      if (!database) {
        return;
      }

      const result = await database.table('tags').orderBy('name').toArray();
      setCategories(result);
    };
    getCategories();
  }, [ database ]);

  return categories;
};

export default useCategories;
