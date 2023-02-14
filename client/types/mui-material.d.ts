/* eslint-disable no-unused-vars */
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: PaletteColorOptions;
    white: PaletteColorOptions;
  }
  interface PaletteOptions {
    neutral: PaletteColorOptions;
    white: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true
  }
}
