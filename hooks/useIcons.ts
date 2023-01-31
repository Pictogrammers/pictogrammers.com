import { useEffect, useState } from 'react';
import uFuzzy from '@leeoniya/ufuzzy';

import { useData } from '../providers/DataProvider';

import { IconLibraryIcon } from '../interfaces/icons';
import { CategoryProps } from '../hooks/useCategories';
import { ContributorProps } from '../interfaces/contributor';

interface FilterProps {
  author?: string;
  category?: string;
  term?: string;
  version?: string;
}

const useIcons = (libraryId: string, filter: FilterProps) => {
  const [ visibleIcons, setVisibleIcons ] = useState<IconLibraryIcon[]>([]);
  const { contributors, libraries } = useData();

  useEffect(() => {
    if (!libraries?.[libraryId]) {
      return;
    }

    const uf = new uFuzzy({});
    const { icons: iconLibrary, tags: iconTags } = libraries[libraryId];

    const results = Object.keys(filter).reduce((output: any, filterType) => {
      if (!filter[filterType as keyof typeof filter] || filter[filterType as keyof typeof filter] === '') {
        return output;
      }

      switch (filterType) {
        case 'author':
          const authorInfo = contributors.find((contributor: ContributorProps) => contributor.github === filter.author);
          return output.filter((icon: IconLibraryIcon) => icon.a === authorInfo?.id);
        case 'category':
          const categoryId = iconTags.findIndex((cat: CategoryProps) => cat.slug === filter.category);
          return output.filter((icon: IconLibraryIcon) => icon.t.includes(categoryId));
        case 'version':
          return output.filter((icon: IconLibraryIcon) => icon.v === filter.version);
        case 'term':
          const haystack = output.map((icon: IconLibraryIcon) => icon.st.join('¦'));
          const needle = filter.term || ''
            .replace(/([A-Z][a-z])/g, ' $1') // Add a space in front of letters is Pascal-case is used
            .replace(/(\d+)/g, ' $1') // Add a space in front of numbers if Pascal-case is used
            .replace(new RegExp(`(^${libraryId})`, 'gi'), '') // Remove a prefix of the library ID
            .toLowerCase();

          const idxs = uf.filter(haystack, needle);
          const info = uf.info(idxs, haystack, needle);
          const order = uf.sort(info, haystack, needle);
          return order.map((position) => output[info.idx[position]]);
        default:
          return output;
      };
    }, iconLibrary);
    setVisibleIcons(results);
  }, [ contributors, filter, libraries, libraryId ]);

  return visibleIcons;
};

export default useIcons;
