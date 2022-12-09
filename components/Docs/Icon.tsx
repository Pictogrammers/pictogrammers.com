import { Icon as MDIcon } from '@mdi/react';
import * as mdi from '@mdi/js';

interface IIcon {
  name: string;
  size?: number;
}

const Icon = (props: IIcon) => {
  const { name, size = 1, ...rest } = props;

  const [ library, iconName ] = name.split(':');

  if (!iconName) {
    return null;
  }

  if (library !== 'mdi') {
    console.warn('Only icons from the MDI library are currently supported in docs.');
    return null;
  }

  const mdiIconName = `mdi${iconName.replace(/(^\w|-\w)/g, (t) => t.replace(/-/, '').toUpperCase())}`;

  // @ts-ignore TODO: Properly type this
  if (!mdi[mdiIconName]) {
    console.warn(`Icon ${mdiIconName} was referenced, but was not found.`);
    return null;
  }

  return (
    // @ts-ignore TODO: Properly type this
    <MDIcon path={mdi[mdiIconName]} size={size * 1} {...rest} />
  );
};

export default Icon;