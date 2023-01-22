import { FunctionComponent } from 'react';

// TODO: This component is temporary until we make changes
// to @mdi/react to allow adjusting the grid size.

interface CustomGridIconProps {
  gridSize: number;
  path: string;
  size: number;
  title?: string;
}

const CustomGridIcon: FunctionComponent<CustomGridIconProps> = ({ gridSize, path, size, title }) => {
  const iconSize = `${size * 1.5}rem`;
  return (
    <svg
      role='presentation'
      style={{ height: iconSize, width: iconSize }}
      viewBox={`0 0 ${gridSize} ${gridSize}`}
    >
      {title && <title>{title}</title>}
      <path d={path} style={{ fill: 'currentcolor' }} />
    </svg>
  );
};

export default CustomGridIcon;