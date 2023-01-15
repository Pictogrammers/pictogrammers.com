import { useEffect, useState } from 'react';

import { useDatabase } from '../providers/DatabaseProvider';

export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
}

const useCategories = (libraryId: string) => {
  const database = useDatabase();
  const [ categories, setCategories ] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      if (!database[libraryId]) {
        return;
      }

      const result = await database[libraryId].table('tags').orderBy('name').toArray();
      setCategories(result);
    };
    getCategories();
  }, [ database, libraryId ]);

  return categories;
  return [];
};

export default useCategories;
