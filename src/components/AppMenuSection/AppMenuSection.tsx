import React from 'react';
import classNames from 'classnames';
import { Text } from '@2600hz/sds-react-components';
import type { Props } from './types';

const AppMenuSection = ({ className, title, children }: Props) => {
  return (
    <div
      className={classNames('sds_AppMenuSection', {
        [String(className)]: className
      })}
    >
      {title && (
        <Text.span className="sds_AppMenuSection_Title">{title}</Text.span>
      )}
      <div className="sds_AppMenuSection_Content">{children}</div>
    </div>
  );
};

export default AppMenuSection;
