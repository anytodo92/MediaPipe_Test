import React from 'react';

// Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';

const MenuData = [
  {
    id: 1,
    text: 'Dashboard',
    url: '/dashboard',
    userAccess: true,
    icon: <DashboardIcon style={{ fill: 'white' }} />,
  },
  // {
  //   id: 2,
  //   text: 'Posts',
  //   url: '/posts',
  //   userAccess: true,
  //   icon: <FeedIcon style={{ fill: 'white' }} />,
  // },
];

export default MenuData;
