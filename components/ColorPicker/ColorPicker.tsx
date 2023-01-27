import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';

import useClickOutside from '../../hooks/useClickOutside';

import classes from './ColorPicker.module.scss';

interface ColorPickerProps {
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  onChange: (newColor: RgbaColor) => any;
};

const PopoverPicker: FunctionComponent<ColorPickerProps> = ({ color, onChange }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [ isOpen, toggleVisibility ] = useState(false);

  const close = useCallback(() => toggleVisibility(false), []);
  useClickOutside(popover, close);

  return (
    <div className={classes.root}>
      <div
        className={classes.swatch}
        style={{ backgroundColor: `rgb(${color.r} ${color.g} ${color.b} / ${color.a * 100}%)` }}
        onClick={() => toggleVisibility(true)}
      />
      {isOpen && (
        <div className={classes.popover} ref={popover}>
          <RgbaColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PopoverPicker;
