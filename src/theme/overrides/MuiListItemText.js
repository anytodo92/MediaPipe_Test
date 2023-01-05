import palette from '../palette';
import typography from '../typography';

export default {
  styleOverrides: {
    primary: {
      color: palette.info.main,
      fontSize: typography.body1.fontSize,
      fontWeight: 'bold',
    },
    secondary: {
      color: palette.info.main,
      fontWeight: 400,
    },
  },
};
