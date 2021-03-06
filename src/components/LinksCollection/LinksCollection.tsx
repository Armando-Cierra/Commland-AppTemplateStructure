import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppMenu,
  AppMenuGroup,
  AppMenuItem
} from '@code503/sds-react-components';
import { useStore } from 'store';

const LinksCollection = () => {
  const { showMenu, setShowMenu, screenSize } = useStore();

  return (
    <AppMenu
      image="https://i.pinimg.com/originals/c7/44/19/c74419884e9aae50ea881ce8d2474d45.png"
      appTitle="App Name"
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      screenWidth={screenSize.dynamicWidth}
    >
      {/*Section 1*/}
      <AppMenuGroup title="Section 1 Example">
        <NavLink to="/page-1">
          <AppMenuItem
            setShowMenu={setShowMenu}
            screenWidth={screenSize.dynamicWidth}
            icon="apps"
            notificationNumber={25}
          >
            Page 1
          </AppMenuItem>
        </NavLink>
        <NavLink to="/page-2">
          <AppMenuItem
            setShowMenu={setShowMenu}
            screenWidth={screenSize.dynamicWidth}
          >
            Page 2
          </AppMenuItem>
        </NavLink>
      </AppMenuGroup>

      {/*Section 2*/}
      <AppMenuGroup title="Section 2 Example">
        <NavLink to="/page-3">
          <AppMenuItem
            setShowMenu={setShowMenu}
            screenWidth={screenSize.dynamicWidth}
          >
            Page 3
          </AppMenuItem>
        </NavLink>
      </AppMenuGroup>
    </AppMenu>
  );
};

export default LinksCollection;
