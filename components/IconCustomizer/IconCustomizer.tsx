import { ChangeEvent, FunctionComponent } from 'react';
import { RgbaColor } from 'react-colorful';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

import ColorPicker from '../ColorPicker/ColorPicker';

import { IconCustomizationProps } from '../../interfaces/icons';

import classes from './IconCustomizer.module.scss';

interface IconCustomizerProps {
  customizations: IconCustomizationProps;
  gridSize: number;
  setCustomizations: Function;
}

const IconCustomizer: FunctionComponent<IconCustomizerProps> = ({ customizations, gridSize, setCustomizations }) => {
  const maxIconSize = gridSize * 10;
  const minIconSize = gridSize / 2;
  const maxPaddingSize = maxIconSize - customizations.size;
  const adjustedPadding = Math.min(customizations.padding, maxIconSize - customizations.size);

  return (
    <div className={classes.root}>
      Foreground: <ColorPicker color={customizations.fgColor} onChange={(color: RgbaColor) => setCustomizations({ ...customizations, fgColor: color })} />
      Background: <ColorPicker color={customizations.bgColor} onChange={(color: RgbaColor) => setCustomizations({ ...customizations, bgColor: color })} />
      <FormControlLabel
        control={<Switch checked={customizations.flipX} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomizations({ ...customizations, flipX: !customizations.flipX })} />}
        label='Flip Horizontally'
        labelPlacement='start'
      />
      <FormControlLabel
        control={<Switch checked={customizations.flipY} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomizations({ ...customizations, flipY: !customizations.flipY })} />}
        label='Flip Vertically'
        labelPlacement='start'
      />
      <div className={classes.rotate}>
        <p id='rotate-controls'>Rotate</p>
        <div className={classes.controls}>
          <Slider
            aria-labelledby='rotate-controls'
            max={360}
            onChange={(e, value) => setCustomizations({ ...customizations, rotate: value })}
            value={customizations.rotate}
          />
          <Input
            inputProps={{
              'aria-labelledby': 'rotate-controls',
              max: 360,
              min: 0,
              step: 10,
              type: 'number'
            }}
            onChange={(e) => setCustomizations({ ...customizations, rotate: e.target.value })}
            size='small'
            value={customizations.rotate}
          />
        </div>
      </div>
      <div className={classes.scale}>
        <p id='size-controls'>Size</p>
        <div className={classes.controls}>
          <Slider
            aria-labelledby='size-controls'
            max={maxIconSize}
            min={minIconSize}
            onChange={(e, value) => setCustomizations({ ...customizations, padding: adjustedPadding, size: value })}
            step={2}
            value={customizations.size}
          />
          <Input
            inputProps={{
              'aria-labelledby': 'size-controls',
              max: maxIconSize,
              min: minIconSize,
              step: 2,
              type: 'number'
            }}
            onChange={(e) => setCustomizations({ ...customizations, padding: adjustedPadding, size: e.target.value })}
            size='small'
            value={customizations.size}
          />
        </div>
      </div>
      <div className={classes.padding}>
        <p id='padding-controls'>Padding</p>
        <div className={classes.controls}>
          <Slider
            aria-labelledby='padding-controls'
            disabled={maxIconSize === customizations.size && customizations.padding === 0}
            max={maxPaddingSize}
            onChange={(e, value) => setCustomizations({ ...customizations, padding: value })}
            step={2}
            value={customizations.padding}
          />
          <Input
            disabled={maxIconSize === customizations.size && customizations.padding === 0}
            inputProps={{
              'aria-labelledby': 'padding-controls',
              max: maxPaddingSize,
              min: 0,
              step: 2,
              type: 'number'
            }}
            onChange={(e) => setCustomizations({ ...customizations, padding: e.target.value })}
            size='small'
            value={customizations.padding}
          />
        </div>
      </div>
      <div className={classes.corners}>
        <p id='radius-controls'>Corner Radius</p>
        <div className={classes.controls}>
          <Slider
            aria-labelledby='radius-controls'
            max={100}
            onChange={(e, value) => setCustomizations({ ...customizations, cornerRadius: value })}
            step={2}
            value={customizations.cornerRadius}
          />
          <Input
            inputProps={{
              'aria-labelledby': 'radius-controls',
              max: 100,
              min: 0,
              step: 2,
              type: 'number'
            }}
            onChange={(e) => setCustomizations({ ...customizations, cornerRadius: e.target.value })}
            size='small'
            value={customizations.cornerRadius}
          />
        </div>
      </div>
    </div>
  );
};

export default IconCustomizer;