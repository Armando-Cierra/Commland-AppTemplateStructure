import React, { useState } from 'react';

import classNames from 'classnames';

import { Avatar, Telicon } from '@2600hz/sds-react-components';
import type { Props } from './types';
import './menu-option.scss';

const MenuOption = ({
  className,
  children,
  icon,
  avatar,
  description,
  disabled,
  value,
  onClick
}: Props) => {
  const [valueState] = useState({
    value,
    text: children,
    description,
    avatar,
    icon
  });

  const click = () => {
    if (onClick && !disabled) {
      onClick(valueState);
    }
  };

  return (
    <div
      className={classNames('sds_MenuOption', {
        sds_MenuOption_Description: description,
        sds_MenuOption_Disabled: disabled,
        [String(className)]: className
      })}
      onClick={click}
    >
      {children && !description && (
        <>
          {avatar && (
            <Avatar profilePic={avatar.profilePic} size="Small" tooltip={false}>
              {avatar.username}
            </Avatar>
          )}
          {icon && !avatar && <Telicon name={icon} size="Default" />}
          {children}
        </>
      )}
      {children && description && (
        <>
          <span className="title">{children}</span>
          <span className="description">{description}</span>
        </>
      )}
    </div>
  );
};

export default MenuOption;
