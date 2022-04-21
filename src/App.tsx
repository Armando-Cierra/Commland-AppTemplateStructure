import React, { useState } from 'react';
import { MenuOption, MenuHeader, Dropdown } from '@2600hz/sds-react-components';
import Navbar from './Navbar';
import './App.scss';

function App() {
  const change = (e: any) => {
    console.log('App Event');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Dropdown id="dropdown" defaultText="Pick something" onChange={change}>
          <MenuHeader>Example</MenuHeader>
          <MenuOption value="element1">Element 1</MenuOption>
          <MenuOption value="element2">Element 2</MenuOption>
          <MenuOption value="element3">Element 3</MenuOption>
        </Dropdown>
      </div>
    </>
  );
}

export default App;
