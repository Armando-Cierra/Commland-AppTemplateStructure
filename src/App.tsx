import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toolbar, Dock, LinksCollection, RoutesCollection } from 'components';
import { useStore } from 'store';
import './app.scss';

const Navbar = () => {
  //For this example I'm using zustand to control showMenu and screenSize states
  const { setScreenSize } = useStore();

  //State and functions to detect the screen resolution and pass it to the global state
  const [screenSizeState, setScreenSizeState] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    setScreenSizeState({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });

    setScreenSize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSizeState]);

  return (
    <>
      {/*This structure is to simulate Single-SPA final structure */}
      <Toolbar />

      <main>
        <Router>
          {/**This is the main div of the app itself */}
          <div className="main">
            <LinksCollection />
            <RoutesCollection />
          </div>
        </Router>
      </main>

      <Dock />
    </>
  );
};

export default Navbar;
