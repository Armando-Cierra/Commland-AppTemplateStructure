import React from 'react';
import classNames from 'classnames';
import { Telicon, Text } from '@2600hz/sds-react-components';
import type { AvailableTelicon } from '@2600hz/sds-react-components/build/components/GeneralComponents/Telicon/telicon-types';

export interface Props {
  className?: string;
  icon?: AvailableTelicon;
  children?: any;
}

const AppMenuItem = ({ className, icon, children }: Props) => {
  return (
    <div
      className={classNames('sds_AppMenuItem', {
        [String(className)]: className
      })}
    >
      {icon && <Telicon name={icon} />}
      <Text.span>{children}</Text.span>ß
    </div>
  );
};

export default AppMenuItem;
