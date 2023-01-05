import palette from '../palette';
import typography from '../typography';

export default {
  styleOverrides: {
    root: {
      backgroundColor: palette.primary.main,
    },
    content: {
      marginTop: '0.7rem',
      marginBottom: '0.4rem',
    },
    title: {
      color: palette.white,
      fontSize: typography.h4.fontSize,
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 'bold',
      alignContent: 'center',
    },
    subheader: {
      color: palette.white,
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
