import { FunctionComponent, ReactNode } from 'react';
import cx from 'clsx';

import classes from './IconPreview.module.scss';

interface IconPreviewProps {
  customizedIcon?: ReactNode;
  gridSize: number;
  path: string;
}

const IconPreview: FunctionComponent<IconPreviewProps> = ({
  customizedIcon,
  gridSize,
  path
}) => {
  const dpWidth = parseInt(classes['dp-width'], 10);
  const maxIconSize = gridSize * dpWidth;
  const gridDimensions = `${maxIconSize}px`;

  return (
    <div className={classes.root}>
      <div
        className={cx(classes.icon, {
          [classes.editing]: !!customizedIcon
        })}
        style={{
          height: gridDimensions,
          width: gridDimensions
        }}
      >
        {!!customizedIcon ? customizedIcon : (
          <svg
            style={{
              height: gridDimensions,
              width: gridDimensions
            }}
            viewBox={`0 0 ${gridSize} ${gridSize}`}
          >
            <path fill='currentColor' d={path} />
          </svg>
        )}
      </div>
    </div>
  );
};

export default IconPreview;
