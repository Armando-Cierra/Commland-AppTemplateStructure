import React, { useState } from 'react';
import {
  Text,
  Button,
  Alert,
  AlertBody,
  AlertFooter
} from '@code503/sds-react-components';
import './App.scss';

function App() {
  const [theme, setTheme] = useState('Default');

  const changeTheme = () => {
    setTheme((prevState) => (prevState === 'Default' ? 'Dark' : 'Default'));

    const body = document.body;
    const bodyTheme = body.getAttribute('data-theme');

    if (bodyTheme === 'Default') {
      body.setAttribute('data-theme', 'Dark');
    } else {
      body.setAttribute('data-theme', 'Default');
    }
  };

  const [display, setDisplay] = useState(false);

  const showAlert = () => {
    setDisplay(true);
  };

  const closeAlert = () => {
    setDisplay(false);
  };

  return (
    <>
      <nav>
        <div className="container">
          <Text.h1 textStyle="Title2">
            Logo
            <Text.span textStyle="Title2" muted>
              Example
            </Text.span>
          </Text.h1>

          <div className="ThemeManagement">
            <Text.span>Theme Management</Text.span>
            <Button
              icon={theme === 'Default' ? 'lightbulb' : 'lightbulb-slash'}
              onClick={changeTheme}
            >
              {theme === 'Default'
                ? 'Change to Dark Theme'
                : 'Change to Light Theme'}
            </Button>
          </div>
        </div>
      </nav>
      <div className="content">
        <Alert title="Alert Title" show={display}>
          <AlertBody>
            <Text.h1 textStyle="Title1">Body Title</Text.h1>
            <Text.p textStyle="Body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              labore quia odio velit. Asperiores dolore quas minima maxime hic
              ipsa quasi ratione nemo quaerat natus distinctio placeat, animi,
              labore officiis!
            </Text.p>
          </AlertBody>
          <AlertFooter>
            <Button
              type="Ghost"
              onClick={() => {
                setDisplay(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="Primary"
              onClick={() => {
                console.log('Primary Action');
                closeAlert();
              }}
            >
              Action
            </Button>
          </AlertFooter>
        </Alert>
        <Button onClick={showAlert}>Display Alert</Button>
      </div>
    </>
  );
}

export default App;
