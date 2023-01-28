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
    a?: number | undefined;
  };
  label: string;
  onChange: ColorChangeHandler;
};

const PopoverPicker: FunctionComponent<ColorPickerProps> = ({ color, label, onChange }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [ isOpen, toggleVisibility ] = useState(false);

  const close = useCallback(() => toggleVisibility(false), []);
  useClickOutside(popover, close);

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={(
          <div
            className={classes.swatch}
            style={{ backgroundColor: `rgb(${color.r} ${color.g} ${color.b} / ${(color.a || 1) * 100}%)` }}
          />
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
