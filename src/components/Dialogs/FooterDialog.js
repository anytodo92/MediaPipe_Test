import React from 'react';

// Material UI
import { withStyles } from '@mui/material/styles';
import MuiDialogActions from '@mui/material/DialogActions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const FooterDialog = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogActions className={classes.root} {...other}>
      {children}
    </MuiDialogActions>
  );
});

export default FooterDialog;
