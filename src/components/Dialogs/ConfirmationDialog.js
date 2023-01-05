import React from 'react';

// Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ details, open, onAgree, onDisagree, isLoading }) => {
  return (
    <div>
      <Dialog
        style={{ zIndex: '9999' }}
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={(_, reason) => reason !== 'backdropClick' && onDisagree()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              padding: '15px',
              height: 'calc(100% - 64px)',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            <DialogContent>
              <Box
                sx={(theme) => ({
                  ...centerStyles,
                  lineHeight: 1.5,
                  fontWeight: 'bold',
                  fontSize: theme.typography.h2.fontSize,
                })}
              >
                {details?.title}
              </Box>
              <Box
                sx={(theme) => ({
                  ...centerStyles,
                  lineHeight: 2,
                  fontSize: theme.typography.h6.fontSize,
                })}
              >
                <div>{details?.content}</div>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                ...centerStyles,
                marginBottom: 2.5,
              }}
            >
              <Button variant="outlined" onClick={onDisagree}>
                {details?.buttonDisagree}
              </Button>
              <StyledConfirmButton variant="contained" onClick={onAgree} disabled={isLoading} details={details}>
                {details?.buttonAgree}
              </StyledConfirmButton>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};

const StyledConfirmButton = styled(Button)(({ theme, details }) => ({
  color: theme.palette.white,
  ...(['error', 'success', 'warning'].includes(details?.type)
    ? {
        backgroundColor: theme.palette[details.type].main,
        '&:hover, &:focus': {
          background: theme.palette[details.type].dark,
        },
      }
    : {
        backgroundColor: theme.palette.primary.main,
        '&:hover, &:focus': {
          background: theme.palette.primary.dark,
        },
      }),
}));

export default ConfirmationDialog;
