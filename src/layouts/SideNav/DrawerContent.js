import { Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import menuData from './menuData';

const DrawerContent = ({ isMobileOpen, isCollapseMenu, setIsCollapseMenu, canCollapseMenu, setCanCollapseMenu }) => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.profile);

  const fname = profile?.fname ? profile?.fname : '';
  const mname = profile?.mname ? profile?.mname : '';
  const lname = profile?.lname ? profile?.lname : '';

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
      onMouseEnter={() => canCollapseMenu && setIsCollapseMenu(false)}
      onMouseLeave={() => canCollapseMenu && setIsCollapseMenu(true)}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {!isMobileOpen && !isCollapseMenu && (
          <Switch
            checked={canCollapseMenu}
            onChange={(e) => setCanCollapseMenu && setCanCollapseMenu(e.target.checked)}
            name="collapse-switch"
            size="small"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            color="secondary"
          />
        )}
      </Box>
      <Divider light />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: isCollapseMenu ? '0 auto' : '0 auto',
        }}
      >
        <br />
        <h2
          style={{
            display: 'flex',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
          onClick={() => navigate('/')}
        >
          {!isCollapseMenu ? 'Hello\n Everyone !' : 'HS'}
        </h2>
      </Box>
      <Divider light />
      {/*<div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem 0',
          }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              backgroundColor: 'white',
            }}
          >
            {fname.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        {!isCollapseMenu && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline',
              marginLeft: '0.5rem',
            }}
          >
            <h3
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {fname} {mname} {lname}
            </h3>
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-0.8rem',
              }}
            >
              {profile?.user_type_id === 1 ? 'Administrator' : 'Employee'}
            </p>
          </div>
        )}
      </div>*/}
      <Divider light />

      <Menu items={menuData} isCollapseMenu={isCollapseMenu} />

      <Divider light />
    </div>
  );
};

DrawerContent.propTypes = {
  isMobileOpen: PropTypes.bool,
  isCollapseMenu: PropTypes.bool,
  setIsCollapseMenu: PropTypes.func,
  canCollapseMenu: PropTypes.bool,
  setCanCollapseMenu: PropTypes.func,
};

export default DrawerContent;
