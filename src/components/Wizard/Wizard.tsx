import { useState, useEffect } from 'react';
import WizardMenuItem from './WizardMenuItem';
import { WizardStep } from '../WizardStep';
import { WizardStepContent } from '../WizardStepContent';
import gettingContent from './gettingContent';
import { Button, Text, Tooltip } from '@2600hz/sds-react-components';
import classNames from 'classnames';
import uniqid from 'uniqid';
import type { Props } from './types';
import './sass/menu-items.scss';
import './sass/wizard.scss';
import './sass/mobile-menu.scss';

const Wizard = ({
  className,
  commland = false,
  children,
  type = 'Initial',
  title,
  confirmationStepTitle = 'Review + Confirm',
  confirmationContentTitle = 'Please review and confirm your configurations.',
  confirmButton = 'Confirm',
  cancelButton = 'Cancel',
  nextButton = 'Next',
  previousButton = 'Previous',
  onCancel,
  onConfirm
}: Props) => {
  let steps: any[] = [];
  let stepsActions: any[] = [];
  let stepsContent: any[] = [];
  let stepsReview: any[] = [];

  const loadContent = () => {
    let incompletContent = gettingContent(children);

    //Adds the confirmation step to the children array
    const addConfirmationStep = () => {
      return (
        <WizardStep stepTitle={confirmationStepTitle}>
          <WizardStepContent type="Content">
            <Text.p
              textStyle="Heading1"
              className="sds_Wizard_Content_Body_ConfirmationTitle"
            >
              {confirmationContentTitle}
            </Text.p>
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
    stepsActions = data.stepsActions;
    stepsContent = data.stepsContent;
    stepsReview = data.stepsReview;
  };

  loadContent();

  const [collapseMenu, setCollapseMenu] = useState(false);
  const [collapseMenuHistory, setCollapseMenuHistory] = useState(collapseMenu);
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

  const nextStep = () => {
    setSelectedStep((prevState) => prevState + 1);
  };

  const previousStep = () => {
    setSelectedStep((prevState) => prevState - 1);
  };

  const manualStepSelection = (index: number) => {
    setSelectedStep(index);
  };

  const cancel = () => {
    if (type === 'Initial') {
      if (onCancel) {
        onCancel();
      }
    }
  };

  const confirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const collapseMenuAction = () => {
    if (screenSize.dynamicWidth > 1023) {
      setCollapseMenuHistory(!collapseMenu);
      setCollapseMenu((prevState) => !prevState);
    } else {
      setCollapseMenu((prevState) => !prevState);
    }
  };

  //Get screen width and height in real time
  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  //Executes some functionalities based on the width of the screen
  useEffect(() => {
    if (screenSize.dynamicWidth >= 767) {
      if (collapseMenu !== collapseMenuHistory) {
        setCollapseMenu(collapseMenuHistory);
      }
    }

    if (screenSize.dynamicWidth >= 767 && showMobileMenu) {
      setShowMobileMenu(false);
    }

    if (screenSize.dynamicWidth >= 767 && screenSize.dynamicWidth <= 1023) {
      setCollapseMenu(true);
    }

    const closingMenus = (e: any) => {
      if (
        screenSize.dynamicWidth <= 1023 &&
        screenSize.dynamicWidth >= 767 &&
        !e.target.className.includes('sds_Wizard_Menu') &&
        !e.target.className.includes('sds_Wizard_Header_Title_CollapseButton')
      ) {
        setCollapseMenu(true);
      }

      if (e.target.id.includes('sds_Wizard_FloatingMenu')) {
        setShowMobileMenu(false);
      }
    };

    const closingMenusWithKeyboard = (e: any) => {
      if (e.code === 'Escape') {
        if (screenSize.dynamicWidth < 767) {
          setShowMobileMenu(false);
        }

        if (screenSize.dynamicWidth <= 1023) {
          setCollapseMenu(true);
        }
      }
    };

    document.addEventListener('click', closingMenus);
    document.addEventListener('keydown', closingMenusWithKeyboard);

    return () => {
      document.removeEventListener('click', closingMenus);
      document.removeEventListener('keydown', closingMenusWithKeyboard);
    };
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
    <div
      className={classNames('sds_Wizard', {
        sds_Wizard_Commland: commland,
        [String(className)]: className
      })}
    >
      {/**MOBILE/FLOATING MENU */}
      {/**----------------------- */}

      <div
        className={classNames('sds_Wizard_FloatingMenu', {
          sds_Wizard_FloatingMenu_Hidden: !showMobileMenu
        })}
        id="sds_Wizard_FloatingMenu"
      >
        <div className="sds_Wizard_FloatingMenu_Sidebar">
          <div className="sds_Wizard_FloatingMenu_Header">
            <Button
              icon="arrow-from-right"
              onClick={() => {
                setShowMobileMenu(false);
              }}
            />
            {title.length > 25 ? (
              <Text.span
                textStyle="BodyLg"
                tooltipMessage={title}
                tooltipPosittion="Bottom"
              >{`${title.substring(0, 25)}...`}</Text.span>
            ) : (
              <Text.span textStyle="BodyLg">{title}</Text.span>
            )}
          </div>
          <div className="sds_Wizard_FloatingMenu_Content">
            {steps.map((step, index) => (
              <WizardMenuItem
                key={uniqid('sds_Wizard_Menu_Item_')}
                collapseMenu={collapseMenu}
                index={index}
                selectedStep={selectedStep}
                blockedSteps={blockedSteps}
                stepsHistory={stepsHistory}
                step={step}
                stepsNumber={steps.length - 1}
                mobileDevice={screenSize.dynamicWidth < 767}
                manualStepSelection={manualStepSelection}
              />
            ))}
          </div>
        </div>
      </div>

      {/**HEADER */}
      {/**----------------------- */}
      <div className="sds_Wizard_Header">
        <div className="sds_Wizard_Header_Title">
          <Button
            type="Ghost"
            className="sds_Wizard_Header_Title_CollapseButton"
            icon="menu"
            onClick={collapseMenuAction}
          />
          {title.length > 25 ? (
            <Text.span
              textStyle="BodyLg"
              tooltipMessage={title}
              tooltipPosittion="Bottom"
            >{`${title.substring(0, 25)}...`}</Text.span>
          ) : (
            <Text.span textStyle="BodyLg">{title}</Text.span>
          )}
        </div>
        <div className="sds_Wizard_Header_Complement">
          <div className="sds_Wizard_Header_Complement_LeftSide">
            <Button
              type="Ghost"
              icon="menu"
              onClick={() => {
                setShowMobileMenu(true);
              }}
            />
            {steps[selectedStep].props.stepTitle.length > 25 ? (
              <Text.span
                textStyle="BodyLg"
                tooltipMessage={steps[selectedStep].props.stepTitle}
                tooltipPosittion="Bottom"
              >
                {`${steps[selectedStep].props.stepTitle.substring(0, 25)}...`}
              </Text.span>
            ) : (
              <Text.span textStyle="BodyLg">
                {steps[selectedStep].props.stepTitle}
              </Text.span>
            )}
          </div>
          <div className="sds_Wizard_Header_Complement_RightSide">
            <div
              className={classNames(
                'sds_Wizard_Header_Complement_RightSide_CustomActions',
                {
                  [String(stepsActions[selectedStep].className)]:
                    stepsActions[selectedStep].className
                }
              )}
            >
              {stepsActions[selectedStep].children}
            </div>
            <Button
              className="sds_Wizard_Header_Complement_RightSide_CancelButton"
              icon="cancel"
              onClick={cancel}
            >
              {screenSize.dynamicWidth <= 767 ? '' : cancelButton}
            </Button>
          </div>
        </div>
      </div>

      {/**BODY */}
      {/**----------------------- */}
      <div className="sds_Wizard_Body">
        <div
          className={classNames('sds_Wizard_Menu', {
            sds_Wizard_Menu_Collapsed: collapseMenu
          })}
        >
          {steps.map((step, index) =>
            collapseMenu ? (
              <Tooltip
                key={uniqid('sds_Wizard_Menu_Item_')}
                message={step.props.stepTitle}
                position="Right"
              >
                <WizardMenuItem
                  collapseMenu={collapseMenu}
                  index={index}
                  selectedStep={selectedStep}
                  blockedSteps={blockedSteps}
                  stepsHistory={stepsHistory}
                  stepsNumber={steps.length - 1}
                  step={step}
                  manualStepSelection={manualStepSelection}
                />
              </Tooltip>
            ) : (
              <WizardMenuItem
                key={uniqid('sds_Wizard_Menu_Item_')}
                collapseMenu={collapseMenu}
                index={index}
                selectedStep={selectedStep}
                blockedSteps={blockedSteps}
                stepsHistory={stepsHistory}
                stepsNumber={steps.length - 1}
                step={step}
                manualStepSelection={manualStepSelection}
              />
            )
          )}
        </div>
        <div className="sds_Wizard_Content">
          <div className="sds_Wizard_Content_Body">
            {stepsContent[selectedStep].children}
          </div>
          <div className="sds_Wizard_Content_Footer">
            {selectedStep !== 0 && (
              <Button onClick={previousStep}>{previousButton}</Button>
            )}
            <Button
              className={classNames({
                sds_Wizard_Content_Footer_Button_NoMargin: selectedStep === 0
              })}
              type="Primary"
              disabled={steps[selectedStep].props.validation === false}
              onClick={selectedStep === steps.length - 1 ? confirm : nextStep}
            >
              {selectedStep === steps.length - 1 ? confirmButton : nextButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
