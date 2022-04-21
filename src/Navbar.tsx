import React, { useState } from 'react';
import { Text, Button } from '@2600hz/sds-react-components';

const Navbar = () => {
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

  return (
    <nav>
      <div className="container">
        <Text.span textStyle="Heading1">
          Logo
          <Text.span textStyle="Title2" muted>
            Example
          </Text.span>
        </Text.span>

        <div className="ThemeManagement">
          <Text.span>Theme Management</Text.span>
          <Button
            icon={theme === 'Default' ? 'lightbulb' : 'lightbulb-slash'}
            onClick={changeTheme}
            type="Primary"
          >
            {theme === 'Default'
              ? 'Change to Dark Theme'
              : 'Change to Light Theme'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
