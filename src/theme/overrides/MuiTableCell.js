import palette from '../palette';
import typography from '../typography';

export default {
  styleOverrides: {
    root: {
      ...typography.body2,
      borderBottom: `1px solid ${palette.divider}`,
      padding: '11px',
    },
    head: {
      color: palette.info.main,
      fontSize: typography.body1.fontSize,
      fontWeight: 'bold',
      lineHeight: '1.3125rem',
    },
    body: {
      color: palette.info.main,
      fontWeight: 400,
    },
  },
};
