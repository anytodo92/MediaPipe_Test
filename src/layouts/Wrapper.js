import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Material UI
import { Box } from '@mui/material';

const SideNav = lazy(() => import('./SideNav'));

const Private = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            width: '100%',
          }}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'flex-end',
              padding: theme.spacing(0, 2),
              // necessary for content to be below app bar
              ...theme.mixins.toolbar,
            })}
          />
          <Suspense fallback={<h3>Loading...</h3>}>
            <Outlet />
          </Suspense>
        </Box>
      </div>
    </div>
  );
};

export default Private;
