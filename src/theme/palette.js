import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#045481',
    main: '#0775b4',
    light: '#4ac2ef',
  },
  secondary: {
    contrastText: '#000000',
    dark: '#d7d7d7',
    main: '#ececec',
    light: '#f8f8f8',
  },
  success: {
    contrastText: white,
    dark: '#107708',
    main: '#14950a',
    light: '#2ac21e',
  },
  info: {
    contrastText: white,
    dark: '#6f6f6f',
    main: '#818181',
    light: '#a5a5a5',
  },
  warning: {
    contrastText: white,
    dark: '#c87a00',
    main: '#fd9a00',
    light: '#f4ac3b',
  },
  error: {
    contrastText: white,
    dark: '#9c1010',
    main: '#c21717',
    light: '#ff5b5b',
  },
  text: {
    primary: '#818181',
    secondary: '#a5a5a5',
    link: colors.blue[600],
    white: white,
  },
  background: {
    default: '#f8f8f8',
    paper: white,
  },
  icon: '#818181',
  divider: '#d7d7d7',
};
