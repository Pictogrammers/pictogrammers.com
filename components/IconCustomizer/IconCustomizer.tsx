import { FunctionComponent, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
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

  const { track } = useAnalytics();

  const clamp = (number: number, min: number, max: number) => Math.max(min, Math.min(number, max));

  const calculateTransform = () => {
    const transforms = [];
    const centerPoint = gridSize / 2;

    // Handle rotations
    transforms.push(`rotate(${customizations.rotate}, ${centerPoint}, ${centerPoint})`);

    // Handle padding and flipping
    const dpPixelRatio = 28.571;
    const scale = 1 - ((customizations.padding * dpPixelRatio) / maxIconSize);
    const translate = (1 - scale) * (centerPoint / scale);
    transforms.push(`scale(${(customizations.flipX ? scale * -1 : scale).toFixed(3)} ${(customizations.flipY ? scale * -1 : scale).toFixed(3)})`);
    transforms.push(`translate(${(customizations.flipX ? (translate * -1) - gridSize : translate).toFixed(3)} ${(customizations.flipY ? (translate * -1) - gridSize : translate).toFixed(3)})`);

    return transforms.join(' ');
  };

  const outputSvg = (
    <svg viewBox={`0 0 ${gridSize} ${gridSize}`} xmlns='http://www.w3.org/2000/svg'>
      <title>{icon.n}</title>
      <rect
        fill={`rgb(${customizations.bgColor.r} ${customizations.bgColor.g} ${customizations.bgColor.b} / ${customizations.bgColor.a * 100}%)`}
        height={gridSize}
        rx={customizations.cornerRadius}
        ry={customizations.cornerRadius}
        width={gridSize}
      />
      <path
        fill={`rgb(${customizations.fgColor.r} ${customizations.fgColor.g} ${customizations.fgColor.b} / ${customizations.fgColor.a * 100}%)`}
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
      ctx?.drawImage(downloadImage, 0, 0, customizations.size, customizations.size);

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
                  max={maxIconSize}
                  min={minIconSize}
                  onChange={(e, value) => setCustomizations({ ...customizations, size: Number(value) })}
                  step={2}
                  value={customizations.size}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}px`}
                />
                <Input
                  endAdornment='px'
                  inputProps={{
                    'aria-labelledby': 'size-controls',
                    inputMode: 'numeric',
                    max: maxIconSize,
                    min: minIconSize,
                    pattern: '[0-9]*',
                    step: 10,
                    type: 'text'
                  }}
                  onBlur={(e) => {
                    if (Number(e.target.value) < minIconSize) {
                      setCustomizations({ ...customizations, size: minIconSize });
                    }
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (isNaN(newValue)) {
                      return;
                    }
                    setCustomizations({ ...customizations, size: clamp(newValue, 0, maxIconSize) });
                  }}
                  size='small'
                  value={customizations.size}
                />
              </div>
            </div>
            <div className={classes.padding}>
              <p id='padding-controls'>Padding</p>
              <div className={classes.controls}>
                <Icon path={mdiStretchToPageOutline} size={1} />
                <Slider
                  aria-labelledby='padding-controls'
                  max={5}
                  onChange={(e, value) => setCustomizations({ ...customizations, padding: Number(value) })}
                  step={1}
                  value={customizations.padding}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}dp`}
                />
                <Input
                  endAdornment='dp'
                  inputProps={{
                    'aria-labelledby': 'padding-controls',
                    inputMode: 'numeric',
                    max: 5,
                    min: 0,
                    pattern: '[0-9]*',
                    step: 1,
                    type: 'text'
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (isNaN(newValue)) {
                      return;
                    }
                    setCustomizations({ ...customizations, padding: clamp(newValue, 0, 5) });
                  }}
                  size='small'
                  value={customizations.padding}
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
                  max={360}
                  onChange={(e, value) => setCustomizations({ ...customizations, rotate: Number(value) })}
                  value={customizations.rotate}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}°`}
                />
                <Input
                  endAdornment='°'
                  inputProps={{
                    'aria-labelledby': 'rotate-controls',
                    inputMode: 'numeric',
                    max: 360,
                    min: 0,
                    pattern: '[0-9]*',
                    step: 10,
                    type: 'text'
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (isNaN(newValue)) {
                      return;
                    }
                    setCustomizations({ ...customizations, rotate: clamp(newValue, 0, 360) });
                  }}
                  size='small'
                  value={customizations.rotate}
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
                  max={12}
                  onChange={(e, value) => setCustomizations({ ...customizations, cornerRadius: Number(value) })}
                  step={1}
                  value={customizations.cornerRadius}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}dp`}
                />
                <Input
                  endAdornment='dp'
                  inputProps={{
                    'aria-labelledby': 'radius-controls',
                    inputMode: 'numeric',
                    max: minIconSize,
                    min: 0,
                    pattern: '[0-9]*',
                    step: 1,
                    type: 'text'
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (isNaN(newValue)) {
                      return;
                    }
                    setCustomizations({ ...customizations, cornerRadius: clamp(newValue, 0, minIconSize) });
                  }}
                  size='small'
                  value={customizations.cornerRadius}
                />
              </div>
            </div>
          </div>
          <div className={classes.flipControls}>
            <FormControlLabel
              control={<Switch checked={customizations.flipX} onChange={() => setCustomizations({ ...customizations, flipX: !customizations.flipX })} />}
              label='Flip Horizontally'
              labelPlacement='end'
            />
            <FormControlLabel
              control={<Switch checked={customizations.flipY} onChange={() => setCustomizations({ ...customizations, flipY: !customizations.flipY })} />}
              label='Flip Vertically'
              labelPlacement='end'
            />
          </div>
        </div>
      </div>
      <Button
        onClick={downloadCustomIcon}
        startIcon={<Icon path={mdiDownload} size={1} />}
        sx={{ margin: '0 1rem', minWidth: '200px' }}
        variant='contained'
      >
        Download PNG
      </Button>
    </div>
  );
};

export default IconCustomizer;