import React from 'react';
import { Telicon, Text } from '@2600hz/sds-react-components';
import classNames from 'classnames';
import uniqid from 'uniqid';

interface Props {
  index: number;
  selectedStep: number;
  blockedSteps: any[];
  stepsHistory: number[];
  stepsNumber: any;
  step: any;
  mobileDevice?: boolean;
  'data-for'?: string;
  'data-tip'?: string;
  manualStepSelection: (e: number) => void;
}

const WizardMenuItem = ({
  index,
  selectedStep,
  blockedSteps,
  manualStepSelection,
  stepsHistory,
  step,
  stepsNumber,
  mobileDevice = false,
  'data-for': dataFor,
  'data-tip': dataTip
}: Props) => {
  return (
    <div
      className={classNames('sds_Wizard_Menu_Item', {
        sds_Wizard_Menu_ActiveItem: index === selectedStep,
        sds_Wizard_Menu_BlockedStep: blockedSteps[index] === false
      })}
      key={uniqid('sds_Wizard_Menu_Step')}
      {...(dataFor && { 'data-for': dataFor })}
      {...(dataTip && { 'data-tip': dataTip })}
      onClick={() => {
        if (blockedSteps[index] !== false) {
          manualStepSelection(index);
        }
      }}
    >
      {stepsHistory.indexOf(index) !== -1 &&
        index !== selectedStep &&
        index !== stepsNumber && (
          <Telicon
            name="check--circle"
            className="sds_Wizard_Menu_Item_CheckIcon"
          />
        )}
      {index === selectedStep && (
        <Telicon name="dot" className="sds_Wizard_Menu_Item_ActiveIcon" />
      )}
      {index === selectedStep && mobileDevice && (
        <Telicon name="dot" className="sds_Wizard_Menu_Item_ActiveIcon" />
      )}
      <Text.span className="sds_Wizard_Menu_Item_Index">
        {index >= selectedStep ? `${index + 1}.` : ''}
      </Text.span>
      <Text.span
        className={classNames('sds_Wizard_Menu_Item_FullText', {
          sds_Wizard_Menu_Item_FullText_NotInteractive:
            (index > selectedStep && stepsHistory.indexOf(index) === -1) ||
            (index === stepsNumber && index !== selectedStep)
        })}
      >{`${index + 1 + '.'} ${
        step.props.stepTitle.length > 25
          ? step.props.stepTitle.substring(0, 25) + '...'
          : step.props.stepTitle
      }`}</Text.span>
    </div>
  );
};

export default WizardMenuItem;
