import { FunctionComponent } from 'react';

import classes from './IconPreview.module.scss';

interface IconPreviewProps {
  gridSize: number;
  path: string;
}

const IconPreview: FunctionComponent<IconPreviewProps> = ({ gridSize, path }) => {
  const gridDimensions = `${gridSize * 10}px`;
  const style = { height: gridDimensions, width: gridDimensions };

  return (
    <div
      className={classes.root}
      style={style}
    >
      <svg style={style} viewBox={`0 0 ${gridSize} ${gridSize}`}>
        <path fill='currentColor' d={path} />
      </svg>
    </div>
  );
};

export default IconPreview;
