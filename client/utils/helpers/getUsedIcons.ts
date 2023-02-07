import * as mdi from '@mdi/js';
import * as mdil from '@mdi/light-js';
import * as memory from '@pictogrammers/memory';
import * as si from 'simple-icons/icons';

import { IconLibraries } from '@/interfaces/icons';

const libraries: IconLibraries = {
  mdi, mdil, memory, si
};

const getUsedIcons = (content: string) => {
  return [...content.matchAll(/(mdi|mdil|memory|si):([a-z0-9-]+)/g)]
    .reduce((output: IconLibraries, icon) => {
      const [ , library, iconSlug ] = icon;

      if (output[library][iconSlug]) {
        return output;
      }

      const iconPascal = iconSlug.split('-').map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
      const iconId = `${library}${iconPascal}`;

      if (library === 'si') {
        output[library][iconSlug] = libraries?.[library]?.[iconId]?.path || '';
        return output;
      }

      output[library][iconSlug] = libraries?.[library]?.[iconId] || '';
      return output;
    }, { mdi: {}, mdil: {}, si: {} });
};

export default getUsedIcons;