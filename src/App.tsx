import React from 'react';
import { useState } from 'react';
import { Button } from '@2600hz/sds-react-components';
import './app.scss';

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

  const [validations, setValidations] = useState({
    stepOne: true,
    stepTwo: true
  });

  const [showModal, setShowModal] = useState(false);

  const cancel = () => {
    console.log('cancel');
    setShowModal(false);
  };

  const confirm = () => {
    console.log('confirm');
  };

  return (
    <>
      <section className="toolbar" />
      <main></main>
      <section className="dock">
        <Button
          icon={theme === 'Default' ? 'lightbulb' : 'lightbulb-slash'}
          onClick={changeTheme}
          type="Primary"
        >
          {theme === 'Default'
            ? 'Change to Dark Theme'
            : 'Change to Light Theme'}
        </Button>
      </section>
    </>
  );
};

export default Navbar;
