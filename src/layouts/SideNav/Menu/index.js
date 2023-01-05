// import { makeStyles } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

const Menu = ({ items, isCollapseMenu }) => {
  const isStaff = useSelector((state) => state.auth.is_staff);

  return (
    <div
      style={{
        flex: 1,
        height: 0,
        padding: '1rem',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {items.map(
        (item) =>
          (item.userAccess || isStaff) && (
            <MenuItem
              key={item.id}
              title={item.title}
              icon={item.icon}
              text={item.text}
              shortText={item.shortText}
              url={item.url}
              submenu={item.submenu}
              isCollapseMenu={isCollapseMenu}
            />
          )
      )}
    </div>
  );
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
  isCollapseMenu: PropTypes.bool,
};

export default Menu;
