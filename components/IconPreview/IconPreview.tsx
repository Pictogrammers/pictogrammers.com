import { Fragment, FunctionComponent, MouseEvent, MouseEventHandler } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';

import { IconCustomizationProps } from '../../interfaces/icons';

import classes from './IconPreview.module.scss';

interface IconPreviewProps {
  allowCustomization?: boolean;
  customizations: IconCustomizationProps;
  gridSize: number;
  isCustomizing?: boolean;
  path: string;
  toggleCustomizationMode?: MouseEventHandler;
}

const IconPreview: FunctionComponent<IconPreviewProps> = ({
  allowCustomization = false,
  customizations,
  gridSize,
  isCustomizing = false,
  toggleCustomizationMode = (e: MouseEvent) => console.warn('No customization handler provided.'),
  path
}) => {
  const dpWidth = parseInt(classes['dp-width'], 10);
  const maxIconSize = gridSize * dpWidth;
  const gridDimensions = `${maxIconSize}px`;
  const previewDimensions = Number(customizations.size) + Number(customizations.padding);

  const calculateTransform = () => {
    const transforms = [];
    const centerPoint = gridSize / 2;

    // Handle rotations
    transforms.push(`rotate(${customizations.rotate}, ${centerPoint}, ${centerPoint})`);

    // Handle padding and flipping
    const scale = 1 - (customizations.padding / maxIconSize);
    const translate = (1 - scale) * (centerPoint / scale);
    transforms.push(`scale(${customizations.flipX ? scale * -1 : scale} ${customizations.flipY ? scale * -1 : scale})`);
    transforms.push(`translate(${customizations.flipX ? (translate * -1) - gridSize : translate} ${customizations.flipY ? (translate * -1) - gridSize : translate})`);

    return transforms.join(' ');
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.icon}
        style={{
          height: gridDimensions,
          width: gridDimensions
        }}
      >
       {isCustomizing && <p className={classes.iconDimensions}>{previewDimensions}x{previewDimensions}</p>}
        <svg
          style={{
            backgroundColor: `rgb(${customizations.bgColor.r} ${customizations.bgColor.g} ${customizations.bgColor.b} / ${customizations.bgColor.a * 100}%)`,
            borderRadius: `${customizations.cornerRadius / 2}%`,
            height: gridDimensions,
            width: gridDimensions
          }}
          viewBox={`0 0 ${gridSize} ${gridSize}`}
        >
          <path
            fill={`rgb(${customizations.fgColor.r} ${customizations.fgColor.g} ${customizations.fgColor.b} / ${customizations.fgColor.a * 100}%)`}
            d={path}
            transform={calculateTransform()}
          />
        </svg>
      </div>
      {allowCustomization && (
        <button
          className={classes.customize}
          onClick={toggleCustomizationMode}
          style={{ width: gridDimensions }}
        >
          {isCustomizing ? (
            <Fragment>
              <Icon path={mdiArrowLeft} size={1} />
              Exit Customization
            </Fragment>
          ) : (
            <Fragment>
              Customize This Icon
              <Icon path={mdiArrowRight} size={1} />
            </Fragment>
          )}
        </button>
      )}
    </div>      
  );
};

export default IconPreview;
