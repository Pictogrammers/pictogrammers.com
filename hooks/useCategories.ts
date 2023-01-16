import { useEffect, useState } from 'react';

import { useData } from '../providers/DataProvider';

export interface CategoryProps {
  id: Number;
  name: string;
  slug: string;
}

const useCategories = (libraryId: string) => {
  const [ categories, setCategories ] = useState<CategoryProps[]>([]);
  const { libraries } = useData();

  useEffect(() => {
    const getCategories = async () => {
      if (!libraries[libraryId]) {
        return;
      }

      const result = [...libraries[libraryId].tags]
        .map((tag, i) => ({ id: i, ...tag }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCategories(result);
    };
    getCategories();
  }, [ libraries, libraryId ]);

  return categories;
};

export default useCategories;
