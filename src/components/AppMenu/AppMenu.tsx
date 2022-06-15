import React from 'react';
import classNames from 'classnames';
import { Button, Text } from '@2600hz/sds-react-components';

export interface Props {
  className?: string;
  appTitle: string;
  image?: string;
  children: any;
  fixed?: boolean;
}

const AppMenu = ({ appTitle, className, image, children, fixed }: Props) => {
  return (
    <div
      className={classNames('sds_AppMenu', {
        [String(className)]: className
      })}
    >
      <div className="sds_AppMenu_Header">
        {!fixed && <Button icon="menu" type="Ghost" />}
        {image && <img src={image} alt={appTitle} />}
        <Text.span>{appTitle}</Text.span>
      </div>
      <div className="sds_AppMenu_Content">{children}</div>
    </div>
  );
};

export default AppMenu;
