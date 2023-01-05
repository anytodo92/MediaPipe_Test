import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import DrawerContent from './DrawerContent';
import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';

// Material
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';

// Redux
import { logout } from 'features/auth/slice';

// Date-FNS
import { format } from 'date-fns';

// Redux
import { useDispatch } from 'react-redux';

const drawerWidth = 255;
const drawerCollapseWidth = 80;

const SideNav = (props) => {
  const { window } = props;
  const theme = useTheme();
  const [canCollapseMenu, setCanCollapseMenu] = useState(false);
  const [isCollapseMenu, setIsCollapseMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedDetails, setSelectedDetails] = useState();
  const [open, setDialogOpen] = useState(false);

  // Profile Menu
  const [openProfileMenu, setProfileMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setProfileMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setProfileMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setProfileMenuOpen(false);
    }
  }

  const prevOpen = React.useRef(openProfileMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openProfileMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openProfileMenu;
  }, [openProfileMenu]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onLogout = () => {
    const arr = {
      ...{
        title: 'Log out',
        content: 'Are you sure you want to log out?',
        buttonDisagree: 'Cancel',
        buttonAgree: 'Log out',
        type: '',
      },
    };
    setSelectedDetails(arr);
    setDialogOpen(true);
    setProfileMenuOpen(false);
  };

  const signOut = () => {
    setTimeout(() => {
      dispatch(logout());
    });
    setIsLoggedOut(true);
    setDialogOpen(false);
  };

  useEffect(() => {
    return setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (canCollapseMenu) {
      setIsCollapseMenu(true);
    }
    return () => {};
  }, [canCollapseMenu]);

  useEffect(() => {
    if (mobileOpen) {
      setIsCollapseMenu(false);
      setCanCollapseMenu(false);
    }
    return () => {};
  }, [mobileOpen]);

  if (loggedOut) {
    return <Navigate to={{ pathname: '/login', state: { referer: location } }} />;
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <DrawerContent
      isMobileOpen={mobileOpen}
      isCollapseMenu={isCollapseMenu}
      setIsCollapseMenu={setIsCollapseMenu}
      canCollapseMenu={canCollapseMenu}
      setCanCollapseMenu={setCanCollapseMenu}
      drawerWidth={drawerWidth}
    />
  );

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed" isCollapseMenu={isCollapseMenu}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { lg: 'none' },
              color: 'primary.main',
            }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              backgroundColor: 'white',
            }}
          >
            <b>{format(new Date(), `cccc`)}&nbsp;</b>
            <br />
            {format(new Date(), `LLLL d, yyyy`)}
          </Typography>
          <div
            style={{
              marginLeft: 'auto',
            }}
          >
            <IconButton
              sx={{
                color: 'primary.main',
              }}
              ref={anchorRef}
              aria-controls={openProfileMenu ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircleIcon color="primary" style={{ fontSize: '30px' }} />
            </IconButton>
            <Popper open={openProfileMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={openProfileMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={onLogout}>Log out</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </StyledAppBar>
      <Box
        component="nav"
        sx={(theme) => ({
          [theme.breakpoints.up('lg')]: {
            width: isCollapseMenu ? drawerCollapseWidth : drawerWidth,
            flexShrink: 0,
            transition: 'all 0.25s linear 0ms',
          },
        })}
        aria-label="mailbox folders"
      >
        <StyledDrawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          elevation={4}
          sx={(theme) => ({
            '& .MuiPaper-root': {
              width: drawerWidth,
            },
            zIndex: theme.zIndex.appBar + 1,
            display: { xs: 'flex', lg: 'none' },
          })}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </StyledDrawer>
        <StyledDrawer
          elevation={4}
          sx={{
            '& .MuiPaper-root': {
              width: isCollapseMenu ? drawerCollapseWidth : drawerWidth,
            },
            display: { xs: 'none', lg: 'flex' },
          }}
          variant="permanent"
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>
      {/*LOG OUT DIALOG*/}
      <ConfirmationDialog
        details={selectedDetails}
        open={open}
        onAgree={signOut}
        onDisagree={() => setDialogOpen(false)}
        isLoading={false}
      />
    </div>
  );
};

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapseMenu',
})(({ theme, isCollapseMenu }) => ({
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${isCollapseMenu ? drawerCollapseWidth : drawerWidth}px)`,
    marginLeft: isCollapseMenu ? drawerCollapseWidth : drawerWidth,
    transition: 'all 0.25s linear 0ms',
  },
  backgroundColor: 'white',
  color: 'primary.main',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    overflow: 'hidden',
    transition: 'all 0.25s linear 0ms',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    boxShadow: '0 1px 6px rgba(57,73,76,0.35)',
  },
}));

SideNav.propTypes = {
  window: PropTypes.func,
};

export default SideNav;
