import React from 'react';
import { useState } from 'react';
import { Button, Checkbox, Text } from '@2600hz/sds-react-components';
import {
  Wizard,
  WizardStep,
  WizardStepActions,
  WizardStepContent,
  WizardStepReview
} from './components';
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
    stepOne: false,
    stepTwo: false
  });

  const cancel = () => {
    console.log('cancel');
  };

  const confirm = () => {
    console.log('confirm');
  };

  return (
    <>
      <section className="toolbar" />
      <main>
        <Wizard title="Example" commland onCancel={cancel} onConfirm={confirm}>
          <WizardStep
            stepTitle="Step One"
            requiresValidation
            validation={validations.stepOne}
          >
            <WizardStepActions type="Actions" className="Actions">
              <Button icon="download">Download</Button>
              <Button icon="mail">Send Email</Button>
            </WizardStepActions>
            <WizardStepContent type="Content">
              <Text.p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                aliquam asperiores quis, fugiat dicta suscipit iusto voluptas
                ullam necessitatibus ducimus enim incidunt eos repellendus? Sunt
                nostrum vitae deleniti voluptatibus minima.
              </Text.p>
              <br />
              <Checkbox
                id="stepOne"
                checked={validations.stepOne}
                label="Validation"
                onChange={(e: any) => {
                  setValidations((prevState) => ({
                    ...prevState,
                    stepOne: e.checked
                  }));
                }}
              />
            </WizardStepContent>
            <WizardStepReview type="Review">
              <Text.p>Something...</Text.p>
              <Button>Example</Button>
            </WizardStepReview>
          </WizardStep>

          <WizardStep stepTitle="Step Two">
            <WizardStepContent type="Content">
              <Text.p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                aliquam asperiores quis, fugiat dicta suscipit iusto voluptas
                ullam necessitatibus ducimus enim incidunt eos repellendus? Sunt
                nostrum vitae deleniti voluptatibus minima.
              </Text.p>
            </WizardStepContent>
            <WizardStepReview type="Review">
              <Text.p>Something...</Text.p>
            </WizardStepReview>
          </WizardStep>

          <WizardStep
            stepTitle="Step Three"
            requiresValidation
            validation={validations.stepTwo}
          >
            <WizardStepContent type="Content">
              <Text.p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                aliquam asperiores quis, fugiat dicta suscipit iusto voluptas
                ullam necessitatibus ducimus enim incidunt eos repellendus? Sunt
                nostrum vitae deleniti voluptatibus minima.
              </Text.p>
              <br />
              <Checkbox
                id="stepTwo"
                checked={validations.stepTwo}
                label="Validation"
                onChange={(e: any) => {
                  setValidations((prevState) => ({
                    ...prevState,
                    stepTwo: e.checked
                  }));
                }}
              />
            </WizardStepContent>
            <WizardStepReview type="Review">
              <Text.p>Something...</Text.p>
            </WizardStepReview>
          </WizardStep>
          <WizardStep stepTitle="Step Four">
            <WizardStepContent type="Content">
              <Text.p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                aliquam asperiores quis, fugiat dicta suscipit iusto voluptas
                ullam necessitatibus ducimus enim incidunt eos repellendus? Sunt
                nostrum vitae deleniti voluptatibus minima.
              </Text.p>
            </WizardStepContent>
            <WizardStepReview type="Review">
              <Text.p>Something...</Text.p>
            </WizardStepReview>
          </WizardStep>
        </Wizard>
      </main>
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

/*

Wizard
  |_WizardSetp (2)
  | |_WizardStepActions
  | |_WizardStepContent
  | |_WizardStepReview
  |
  |_WizardStep (3)
    |_...(And Ahead)

*/
