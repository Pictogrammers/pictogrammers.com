import { ChangeEvent, FunctionComponent, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ColorResult } from 'react-color';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Icon from '@mdi/react';
import {
  mdiBorderRadius,
  mdiDownload,
  mdiReload,
  mdiResize,
  mdiStretchToPageOutline
} from '@mdi/js';

import IconPreview from '../IconPreview/IconPreview';
import ColorPicker from '../ColorPicker/ColorPicker';

import { IconCustomizationProps, IconLibraryIcon } from '../../interfaces/icons';

import classes from './IconCustomizer.module.scss';

interface IconCustomizerProps {
  gridSize: number;
  icon: IconLibraryIcon;
}

const IconCustomizer: FunctionComponent<IconCustomizerProps> = ({ gridSize, icon }) => {
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

  const dpWidth = parseInt(classes['dp-width'], 10);
  const maxIconSize = gridSize * dpWidth;
  const minIconSize = gridSize / 2;
  const maxPaddingSize = maxIconSize - customizations.size;
  const adjustedPadding = Math.min(customizations.padding, maxIconSize - customizations.size);

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
        rx={customizations.cornerRadius}
        ry={customizations.cornerRadius}
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
            <ColorPicker color={customizations.fgColor} label='Foreground Color' onChange={(color: ColorResult) => setCustomizations({ ...customizations, fgColor: color.rgb })} />
            <ColorPicker color={customizations.bgColor} label='Background Color' onChange={(color: ColorResult) => setCustomizations({ ...customizations, bgColor: color.rgb })} />
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
                  onChange={(e, value) => setCustomizations({ ...customizations, padding: adjustedPadding, size: Number(value) })}
                  step={2}
                  value={customizations.size}
                  valueLabelDisplay='auto'
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
                />
              </div>
            </div>
            <div className={classes.corners}>
              <p id='radius-controls'>Corner Radius</p>
              <div className={classes.controls}>
                <Icon path={mdiBorderRadius} size={1} />
                <Slider
                  aria-labelledby='radius-controls'
                  max={minIconSize}
                  onChange={(e, value) => setCustomizations({ ...customizations, cornerRadius: Number(value) })}
                  step={1}
                  value={customizations.cornerRadius}
                  valueLabelDisplay='auto'
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
        sx={{ margin: '0 1rem' }}
        variant='contained'
      >
        Download PNG ({customizations.size}x{customizations.size})
      </Button>
    </div>
  );
};

export default IconCustomizer;