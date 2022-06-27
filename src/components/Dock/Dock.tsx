import React, { useState } from 'react';
import { Button } from '@2600hz/sds-react-components';

const Dock = () => {
  const [theme, setTheme] = useState('Dark');

  const changeTheme = () => {
    const body = document.body;
    const bodyTheme = body.getAttribute('data-theme');

    if (bodyTheme === 'Light') {
      body.setAttribute('data-theme', 'Dark');
    } else {
      body.setAttribute('data-theme', 'Light');
    }
  };

  return (
    <section className="dock">
      <Button
        icon={theme === 'Light' ? 'lightbulb' : 'lightbulb-slash'}
        onClick={() => {
          changeTheme();
        }}
        type="Primary"
      >
        {theme === 'Light' ? 'Change to Dark Theme' : 'Change to Light Theme'}
      </Button>
    </section>
  );
};

export default Dock;
