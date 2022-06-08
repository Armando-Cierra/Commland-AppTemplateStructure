import { useState, useEffect } from 'react';
import WizardMenuItem from './WizardMenuItem';
import {
  WizardStep,
  WizardStepContent,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Tooltip
} from '@code503/sds-react-components';
import gettingContent from './gettingContent';
import classNames from 'classnames';
import uniqid from 'uniqid';
import type { Props } from './types';
import './sass/menu-items.scss';
import './sass/wizard.scss';
import './sass/mobile-menu.scss';

const MiniWizard = ({
  className,
  show,
  commland = false,
  children,
  type = 'Initial',
  title,
  confirmationStepTitle = 'Review + Confirm',
  confirmationContentTitle = 'Please review and confirm your configurations.',
  confirmationContentDescription,
  confirmButton = 'Confirm',
  cancelButton = 'Cancel',
  nextButton = 'Next',
  previousButton = 'Previous',
  onCancel,
  onConfirm
}: Props) => {
  let steps: any[] = [];
  let stepsContent: any[] = [];

  const loadContent = () => {
    let incompletContent = gettingContent(children);

    //Adds the confirmation step to the children array
    const addConfirmationStep = () => {
      return (
        <WizardStep stepTitle={confirmationStepTitle}>
          <WizardStepContent type="Content">
            <div className="sds_Wizard_Content_Body_ConfirmationIntro">
              <Text.p
                textStyle="Heading1"
                className="sds_Wizard_Content_Body_ConfirmationTitle"
              >
                {confirmationContentTitle}
              </Text.p>
              {confirmationContentDescription && (
                <Text.p className="sds_Wizard_Content_Body_ConfirmationDescription">
                  {confirmationContentDescription}
                </Text.p>
              )}
            </div>
            {incompletContent.steps.map((step, index) => {
              return (
                <div
                  className="sds_Wizard_Content_Body_ConfirmationStep"
                  key={uniqid('sds_Wizard_Content_Body_ConfirmationStep_')}
                >
                  <div className="sds_Wizard_Content_Body_ConfirmationStep_TitleBox">
                    <Text.span
                      textStyle="BodyLg"
                      className="sds_Wizard_Content_Body_ConfirmationStep_TitleBox_Title"
                    >
                      {index + 1}. {step.props.stepTitle}
                    </Text.span>
                    <Button
                      icon="edit"
                      type="Ghost"
                      size="Small"
                      onClick={() => {
                        setSelectedStep(index);
                      }}
                    />
                  </div>
                  <div className="sds_Wizard_Content_Body_ConfirmationStep_Content">
                    {incompletContent.stepsReview[index].children}
                  </div>
                </div>
              );
            })}
          </WizardStepContent>
        </WizardStep>
      );
    };

    const fullContent = [...incompletContent.steps, addConfirmationStep()];

    const data = gettingContent(fullContent);
    steps = data.steps;
    stepsContent = data.stepsContent;
  };

  loadContent();

  const [blockedSteps, setBlockedSteps] = useState<any>([]);
  const [selectedStep, setSelectedStep] = useState(
    type === 'Edit' ? steps.length - 1 : 0
  );
  const [stepsHistory, setStepsHistory] = useState([0]);
  const [screenSize, setScreenSize] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  };

  const manualStepSelection = (index: number) => {
    setSelectedStep(index);
  };

  const previousStep = () => {
    setSelectedStep((prevState) => prevState - 1);
  };

  const nextStep = () => {
    setSelectedStep((prevState) => prevState + 1);
  };

  const cancel = () => {
    if (type === 'Initial') {
      setSelectedStep(0);
      setStepsHistory([0]);
    }

    if (type === 'Edit') {
      setSelectedStep(stepsContent.length - 1);
    }

    if (onCancel) {
      onCancel();
    }
  };

  const confirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  useEffect(() => {
    if (
      show === false &&
      showMobileMenu === true &&
      screenSize.dynamicWidth < 767
    ) {
      setShowMobileMenu(false);
    }
  }, [show]);

  //Get screen width and height in real time
  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    const closeMenu = (e: any) => {
      console.log(e.target);
      if (
        e.target.className !== 'sds_MiniWizard_Menu' &&
        !String(e.target.className).includes('sds_MiniWizard_MobileMenuBtn') &&
        !String(e.target.className).includes(
          'sds_Wizard_Menu_Item_FullText_NotInteractive'
        )
      ) {
        setShowMobileMenu(false);
      }
    };

    if (screenSize.dynamicWidth < 767) {
      document.addEventListener('click', closeMenu);
    }
  }, [screenSize.dynamicWidth]);

  //Steps validation for the menu
  useEffect(() => {
    let stepsValidationArray: any = [];

    steps.forEach((step) => {
      if (step.props.validation === undefined) {
        stepsValidationArray = [...stepsValidationArray, true];
      } else {
        stepsValidationArray = [...stepsValidationArray, step.props.validation];
      }
    });

    const firstBlockedStepPosition = stepsValidationArray.indexOf(false);
    let blockedStepsArray: any = [];

    if (firstBlockedStepPosition === -1) {
      stepsValidationArray.forEach(() => {
        blockedStepsArray = [...blockedStepsArray, true];
      });
    } else {
      for (let index = 0; index in stepsValidationArray; index++) {
        if (index <= firstBlockedStepPosition) {
          blockedStepsArray = [...blockedStepsArray, true];
        } else {
          blockedStepsArray = [...blockedStepsArray, false];
        }
      }
    }

    setBlockedSteps(blockedStepsArray);
  }, [children]);

  useEffect(() => {
    if (type === 'Edit') {
      for (let index = 0; index in steps; index++) {
        setStepsHistory((prevState) => [...prevState, index]);
      }
    } else if (stepsHistory.indexOf(selectedStep) === -1) {
      for (let index = 0; index <= selectedStep; index++) {
        if (stepsHistory.indexOf(index) === -1) {
          setStepsHistory((prevState) => [...prevState, index]);
        }
      }
    }
  }, [selectedStep]);

  return (
    <Modal
      title={title}
      show={show}
      cancelAction={cancel}
      className={classNames('sds_MiniWizard', {
        sds_MiniWizard_Commland: commland,
        [String(className)]: className
      })}
    >
      <ModalBody paddingDisabled>
        <div
          className={classNames('sds_MiniWizard_Menu', {
            sds_MiniWizard_Menu_Hidden: !showMobileMenu
          })}
        >
          {steps.map((step, index) => (
            <WizardMenuItem
              key={uniqid('sds_Wizard_Menu_Item_')}
              index={index}
              selectedStep={selectedStep}
              blockedSteps={blockedSteps}
              stepsHistory={stepsHistory}
              stepsNumber={steps.length - 1}
              step={step}
              manualStepSelection={manualStepSelection}
            />
          ))}
          <div className="sds_MiniWizard_Menu_Overlay" />
        </div>
        <div className="sds_MiniWizard_Content">
          <div className="sds_MiniWizard_Content_Header">
            <Button
              icon="menu"
              type="Ghost"
              className="sds_MiniWizard_MobileMenuBtn"
              onClick={() => {
                setShowMobileMenu((prevState) => !prevState);
              }}
            />
            <Text.span> {steps[selectedStep].props.stepTitle} </Text.span>
          </div>
          <div className="sds_MiniWizard_Content_Body">
            {stepsContent[selectedStep].children}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="sds_MiniWizard_Content_Footer_Cancel"
          type="Ghost"
          onClick={cancel}
        >
          {cancelButton}
        </Button>
        {selectedStep !== 0 && (
          <Button
            className="sds_MiniWizard_Content_Footer_Previous"
            onClick={previousStep}
          >
            {previousButton}
          </Button>
        )}
        <Button
          className={classNames('sds_MiniWizard_Content_Footer_Next-Confirm')}
          type="Primary"
          disabled={steps[selectedStep].props.validation === false}
          onClick={selectedStep === steps.length - 1 ? confirm : nextStep}
        >
          {selectedStep === steps.length - 1 ? confirmButton : nextButton}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MiniWizard;
