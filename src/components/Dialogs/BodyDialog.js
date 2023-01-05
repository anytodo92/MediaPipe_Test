import React from 'react';

// Material UI
import { withStyles } from '@mui/material/styles';
import MuiDialogContent from '@mui/material/DialogContent';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4, 5),
  },
});

const BodyDialog = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogContent {...other} sx={{ px: 4, py: 5 }}>
      {children}
    </MuiDialogContent>
  );
});

export default BodyDialog;
