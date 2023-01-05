import palette from '../palette';

export default {
  styleOverrides: {
    containedPrimary: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      '&:hover': {
        backgroundColor: palette.primary.dark,
      },
    },
    root: {
      textTransform: 'none',
    },
  },
};
