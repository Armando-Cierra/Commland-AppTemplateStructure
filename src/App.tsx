import React from 'react';
import { useState } from 'react';
import { MiniWizard } from './components';
import {
  Button,
  Checkbox,
  Text,
  WizardStep,
  WizardStepActions,
  WizardStepContent,
  WizardStepReview
} from '@code503/sds-react-components';
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
      <main>
        <MiniWizard
          show={showModal}
          title="Example"
          commland
          type="Edit"
          confirmationContentDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque temporibus, hic ullam, ipsum corporis quas praesentium libero culpa eum accusamus, eos facere quasi ducimus voluptatibus aperiam necessitatibus reiciendis error totam."
          onCancel={cancel}
          onConfirm={confirm}
        >
          <WizardStep stepTitle="Step One" validation={validations.stepOne}>
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

          <WizardStep stepTitle="Step Three" validation={validations.stepTwo}>
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
        </MiniWizard>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Open Modal
        </Button>
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
