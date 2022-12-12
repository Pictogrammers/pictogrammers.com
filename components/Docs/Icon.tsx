import { Icon as MDIcon } from '@mdi/react';

import { IconProps } from '../../interfaces/icons';

const Icon = (props: IconProps) => {
  const { availableIcons, name, path, size = 1, ...rest } = props;

  if (path) {
    return <MDIcon path={path} size={size * 1} {...rest} />;
  }

  const [ library, iconName ] = name.split(':');
  if (!iconName) {
    return null;
  }

  if (!['mdi', 'mdil', 'si'].includes(library)) {
    console.warn('Only icons from the Material Design Icons (mdi:), Material Design Icons Light (mdil:), and Simple Icons (si:) libraries are currently supported in docs.');
    return null;
  }

  if (!availableIcons?.[library]?.[iconName]) {
    console.warn(`Icon ${library}:${iconName} was referenced, but was not found.`);
    return null;
  }

  return (
    <MDIcon path={availableIcons[library][iconName]} size={size * 1} {...rest} />
  );
};

export default Icon;