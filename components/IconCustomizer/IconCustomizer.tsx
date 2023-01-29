import { ChangeEvent, FunctionComponent, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ColorResult } from 'react-color';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mdi/react';
import {
  mdiBorderRadius,
  mdiDownload,
  mdiHelpCircleOutline,
  mdiReload,
  mdiResize,
  mdiStretchToPageOutline
} from '@mdi/js';

import IconPreview from '../IconPreview/IconPreview';
import ColorPicker from '../ColorPicker/ColorPicker';

import useWindowSize from '../../hooks/useWindowSize';
import { useAnalytics } from 'use-analytics';

import { IconCustomizationProps, IconLibrary, IconLibraryIcon } from '../../interfaces/icons';

import classes from './IconCustomizer.module.scss';

interface IconCustomizerProps {
  gridSize: number;
  icon: IconLibraryIcon;
  library: IconLibrary;
}

const IconCustomizer: FunctionComponent<IconCustomizerProps> = ({ gridSize, icon, library }) => {
  const [ customizations, setCustomizations ] = useState<IconCustomizationProps>({
    bgColor: { a: 0, b: 255, g: 255, r: 255 },
    cornerRadius: 0,
    fgColor: { a: 1, b: 0, g: 0, r: 0 },
    flipX: false,
    flipY: false,
    padding: 0,
    rotate: 0,
    size: gridSize
  });

  const maxIconSize = 256;
  const minIconSize = gridSize / 2;
  const maxPaddingSize = maxIconSize - customizations.size;
  const maxCornerRadius = minIconSize / 100;
  const adjustedPadding = Math.min(customizations.padding, maxIconSize - customizations.size);

  const { track } = useAnalytics();
  const windowSize = useWindowSize();
  const isMobileWidth = windowSize.width <= parseInt(classes['mobile-width']);

  const calculateTransform = () => {
    const transforms = [];
    const centerPoint = gridSize / 2;

    // Handle rotations
    transforms.push(`rotate(${customizations.rotate}, ${centerPoint}, ${centerPoint})`);

    // Handle padding and flipping
    const scale = 1 - (customizations.padding / maxIconSize);
    const translate = (1 - scale) * (centerPoint / scale);
    transforms.push(`scale(${(customizations.flipX ? scale * -1 : scale).toFixed(3)} ${(customizations.flipY ? scale * -1 : scale).toFixed(3)})`);
    transforms.push(`translate(${(customizations.flipX ? (translate * -1) - gridSize : translate).toFixed(3)} ${(customizations.flipY ? (translate * -1) - gridSize : translate).toFixed(3)})`);

    return transforms.join(' ');
  };

  const outputSvg = (
    <svg viewBox={`0 0 ${gridSize} ${gridSize}`} xmlns='http://www.w3.org/2000/svg'>
      <title>{icon.n}</title>
      <rect
        fill={`rgb(${customizations.bgColor.r} ${customizations.bgColor.g} ${customizations.bgColor.b} / ${(customizations.bgColor.a || 0) * 100}%)`}
        height={gridSize}
        rx={customizations.cornerRadius * maxCornerRadius}
        ry={customizations.cornerRadius * maxCornerRadius}
        width={gridSize}
      />
      <path
        fill={`rgb(${customizations.fgColor.r} ${customizations.fgColor.g} ${customizations.fgColor.b} / ${(customizations.fgColor.a || 1) * 100}%)`}
        d={icon.p}
        transform={calculateTransform()}
      />
    </svg>
  );

  const downloadCustomIcon = () => {
    const svgUrl = URL.createObjectURL(new Blob([renderToStaticMarkup(outputSvg)], { type: 'image/svg+xml' }));
    const downloadImage = document.createElement('img');
    const downloadCanvas = document.createElement('canvas');
    const downloadLink = document.createElement('a');
    downloadImage.src = svgUrl;
    downloadImage.onload = () => {
      downloadCanvas.width = customizations.size;
      downloadCanvas.height = customizations.size;
      const ctx = downloadCanvas.getContext('2d');
      ctx?.drawImage(downloadImage, 0, 0);

      downloadLink.href = downloadCanvas.toDataURL('image/png');
      downloadLink.download = `${icon.n}-custom\.png`;
      downloadLink.click();
    
      track('advancedPNGExportDownload', { icon: icon.n, library: library.name, ...customizations });
      URL.revokeObjectURL(svgUrl);
      downloadCanvas.remove();
      downloadImage.remove();
      downloadLink.remove();
    };
  };

  return (
    <div className={classes.root}>
      <div className={classes.interface}>
        <div className={classes.preview}>
          <IconPreview
            customizedIcon={outputSvg}
            gridSize={gridSize}
            path={icon.p}
          />
        </div>
        <div className={classes.customize}>
          <div className={classes.colors}>
            <ColorPicker
              color={customizations.fgColor}
              label='Foreground Color'
              onChange={(color: { rgb: IconCustomizationProps['fgColor'] }) => setCustomizations({ ...customizations, fgColor: color.rgb })}
            />
            <ColorPicker
              color={customizations.bgColor}
              label='Background Color'
              onChange={(color: { rgb: IconCustomizationProps['bgColor'] }) => setCustomizations({ ...customizations, bgColor: color.rgb })}
            />
          </div>
          <div className={classes.sliderGroup}>
            <div className={classes.scale}>
              <p id='size-controls'>Size</p>
              <div className={classes.controls}>
                <Icon path={mdiResize} size={1} />
                <Slider
                  aria-labelledby='size-controls'
                  marks={!isMobileWidth && [
                    { label: '48px', value: 48 },
                    { label: '128px', value: 128 },
                    { label: '256px', value: 256 }
                  ]}
                  max={maxIconSize}
                  min={minIconSize}
                  onChange={(e, value) => setCustomizations({ ...customizations, padding: adjustedPadding, size: Number(value) })}
                  step={2}
                  value={customizations.size}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}px`}
                />
              </div>
            </div>
            <div className={classes.padding}>
              <p id='padding-controls'>Padding</p>
              <div className={classes.controls}>
                <Icon path={mdiStretchToPageOutline} size={1} />
                <Slider
                  aria-labelledby='padding-controls'
                  disabled={maxIconSize === customizations.size && customizations.padding === 0}
                  max={maxPaddingSize}
                  onChange={(e, value) => setCustomizations({ ...customizations, padding: Number(value) })}
                  step={2}
                  value={customizations.padding}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}px`}
                />
              </div>
            </div>
          </div>
          <div className={classes.sliderGroup}>
            <div className={classes.rotate}>
              <p id='rotate-controls'>Rotate</p>
              <div className={classes.controls}>
                <Icon path={mdiReload} size={1} />
                <Slider
                  aria-labelledby='rotate-controls'
                  marks={!isMobileWidth && [
                    { label: '90°', value: 90 },
                    { label: '180°', value: 180 },
                    { label: '270°', value: 270 }
                  ]}
                  max={360}
                  onChange={(e, value) => setCustomizations({ ...customizations, rotate: Number(value) })}
                  value={customizations.rotate}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}°`}
                />
              </div>
            </div>
            <div className={classes.corners}>
              <p id='radius-controls'>
                Corner Radius
                <Tooltip arrow placement='top' title='Only applies when a background color is visible.'>
                  <Icon path={mdiHelpCircleOutline} size={.6} />
                </Tooltip>
              </p>
              <div className={classes.controls}>
                <Icon path={mdiBorderRadius} size={1} />
                <Slider
                  aria-labelledby='radius-controls'
                  disabled={customizations.bgColor.a < 0.01}
                  max={100}
                  onChange={(e, value) => setCustomizations({ ...customizations, cornerRadius: Number(value) })}
                  step={10}
                  value={customizations.cornerRadius}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}%`}
                />
              </div>
            </div>
          </div>      
          <div className={classes.flipControls}>
            <FormControlLabel
              control={<Switch checked={customizations.flipX} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomizations({ ...customizations, flipX: !customizations.flipX })} />}
              label='Flip Horizontally'
              labelPlacement='end'
            />
            <FormControlLabel
              control={<Switch checked={customizations.flipY} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomizations({ ...customizations, flipY: !customizations.flipY })} />}
              label='Flip Vertically'
              labelPlacement='end'
            />
          </div>    
        </div>
      </div>
      <Button
        onClick={downloadCustomIcon}
        startIcon={<Icon path={mdiDownload} size={1} />}
        sx={{ margin: '0 1rem', minWidth: '250px' }}
        variant='contained'
      >
        Download PNG ({customizations.size}x{customizations.size})
      </Button>
    </div>
  );
};

export default IconCustomizer;