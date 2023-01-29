import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';
import FormControlLabel from '@mui/material/FormControlLabel';

import useClickOutside from '../../hooks/useClickOutside';

import classes from './ColorPicker.module.scss';

interface ColorPickerProps {
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  label: string;
  onChange: any;
};

const PopoverPicker: FunctionComponent<ColorPickerProps> = ({ color, label, onChange }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [ isOpen, toggleVisibility ] = useState(false);

  const close = useCallback(() => toggleVisibility(false), []);
  useClickOutside(popover, close);

  console.log(label, color);

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={(
          <div className={classes.swatch}>
            <div
              className={classes.selectedColor}
              style={{ backgroundColor: `rgb(${color.r} ${color.g} ${color.b} / ${color.a * 100}%)` }}
            />
          </div>
        )}
        label={label}
        labelPlacement='end'
        onClick={() => toggleVisibility(true)}
      />
      {isOpen && (
        <div className={classes.popover} ref={popover}>
          <ChromePicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PopoverPicker;
