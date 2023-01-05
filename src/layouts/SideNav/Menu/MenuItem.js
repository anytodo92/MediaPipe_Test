import React, { useState, useCallback, useEffect } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import { Collapse } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { styled } from '@mui/material/styles';

// Redux
import { useSelector } from 'react-redux';

const checkActive = (currentPath, path) => {
  return matchPath(
    {
      path: path,
      exact: true,
      strict: false,
    },
    currentPath
  );
};

const MenuItem = (props) => {
  const { isCollapseMenu, title, icon, text, shortText, submenu, url } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const isStaff = useSelector((state) => state.auth.is_staff);

  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const onPathChange = useCallback(
    (currentPath) => {
      if (submenu) {
        for (let subitem of submenu) {
          if (checkActive(subitem.url, currentPath)) {
            setIsOpened(true);
            break;
          }
        }
      } else {
        setIsActive(checkActive(url, currentPath));
      }
    },
    [submenu, url]
  );

  useEffect(() => {
    onPathChange(location.pathname);
  }, [location.pathname, onPathChange]);

  const onClick = (e) => {
    e.preventDefault();
    if (submenu) {
      setIsOpened(!isOpened);
    } else {
      navigate(url);
    }
  };

  if (!!title) {
    return (
      !isCollapseMenu && (
        <div
          style={{
            display: 'flex',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      )
    );
  }

  const content = (
    <React.Fragment>
      {/* START ICON */}
      <StartIcon>
        {icon || (
          <FiberManualRecordIcon
            style={{ fontSize: 6, color: 'rgba(255, 255, 255, 0.7)', marginLeft: '0.5rem', marginRight: '0.6rem' }}
          />
        )}
      </StartIcon>

      {/* TEXT */}
      {
        <div
          style={{
            flex: 1,
            textAlign: 'left',
            fontSize: '0.875rem',
            // paddingLeft: '1rem',
            paddingRight: '1rem',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      }
      {/* END ICON */}
      {!!submenu && (
        <div
          style={{
            marginRight: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
            transform: isOpened ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          {isOpened}
          <ChevronRightIcon style={{ fontSize: 18 }} />
        </div>
      )}
    </React.Fragment>
  );

  const collapseContent = (
    <React.Fragment>
      {icon ? (
        <React.Fragment>
          <StartIcon>
            {icon || (
              <FiberManualRecordIcon
                style={{ fontSize: 6, color: 'rgba(255, 255, 255, 0.7)', marginRight: '0.5rem' }}
              />
            )}
          </StartIcon>
          <div style={{ flex: 1 }}></div>
        </React.Fragment>
      ) : (
        <div
          style={{
            flex: 1,
            textAlign: 'left',
            fontSize: '0.65rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          {shortText || (text[0] + text[1] + '').toUpperCase()}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <StyledButtonBase onClick={onClick} color="inherit" component={Link} to={url} isActive={isActive}>
        {!isCollapseMenu ? content : collapseContent}
      </StyledButtonBase>
      {/* SUBMENU */}
      {submenu && (
        <Collapse in={isOpened} timeout="auto" unmountOnExit>
          {submenu.map(
            (subitem, index) =>
              (subitem.userAccess || isStaff) && (
                <MenuItem
                  key={index}
                  isCollapseMenu={isCollapseMenu}
                  history={navigate}
                  icon={null}
                  text={subitem.text}
                  shortText={subitem.shortText}
                  url={subitem.url}
                />
              )
          )}
        </Collapse>
      )}
    </React.Fragment>
  );
};

const StyledButtonBase = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  width: '100%',
  borderRadius: '4px',
  display: 'flex',
  padding: '0.75rem 0',
  alignItems: 'center',
  marginBottom: 1,
  justifyContent: 'flex-start',
  background: isActive ? 'rgba(0, 0, 0, 0.15)' : 'transparent',
  color: 'white !important',
}));

const StartIcon = styled('div')(({ theme }) => ({
  flex: 'none',
  width: 48,
  fontSize: 18,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

MenuItem.propTypes = {
  isCollapseMenu: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.any,
  text: PropTypes.string,
  shortText: PropTypes.string,
  url: PropTypes.string,
  submenu: PropTypes.array,
};

export default MenuItem;
