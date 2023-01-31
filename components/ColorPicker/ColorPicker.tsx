import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
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
          <SketchPicker
            color={color}
            onChange={onChange}
            presetColors={[
              '#D0021B',
              '#F5A623',
              '#F8E71C',
              '#8B572A',
              '#7ED321',
              '#417505',
              '#BD10E0',
              '#9013FE',
              '#530066',
              '#4A90E2',
              '#50E3C2',
              '#3B5F68',
              '#B8E986',
              '#000000',
              '#4A4A4A',
              '#9B9B9B',
              '#FFFFFF',
              { color: 'TRANSPARENT', title: 'Transparent' }
            ]}
            width='225px'
          />
        </div>
      )}
    </div>
  );
};

export default PopoverPicker;
