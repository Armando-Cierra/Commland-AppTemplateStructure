import React from 'react';
import { getData } from './util';
import classNames from 'classnames';
import { Button, Text, MenuBox } from '@2600hz/sds-react-components';

interface Props {
  className?: string;
  pageTitle: string;
  children: any;
  previousPage?: () => void;
}

const AppPage = ({ className, pageTitle, children: data }: Props) => {
  let navigation: any[] = [];
  let nestedNavigation: any[] = [];
  let actions: any[] = [];
  let content: any[] = [];

  const loadData = () => {
    const fullData = getData(data);

    navigation = fullData.navigation;
    nestedNavigation = fullData.nestedNavigation;
    actions = fullData.actions;
    content = fullData.content;
  };

  loadData();

  return (
    <div
      className={classNames('sds_AppPage', {
        [String(className)]: className
      })}
    >
      <div className="sds_AppPage_Header">
        <div className="sds_AppPage_LeftSide">
          {navigation.length === 1 && (
            <Button type="Ghost" size="Small" icon="chevron-left" />
          )}
          <div className="sds_AppPage_Header_LeftSide_BackMenu">
            {navigation.length > 1 && (
              <Button type="Ghost" size="Small" icon="chevron-double-left" />
            )}
            <MenuBox>{navigation}</MenuBox>
          </div>
          <Text.span>{pageTitle}</Text.span>
        </div>
        <div className="sds_AppPage_RightSide">
          {actions.length > 0 && actions}
        </div>
      </div>
      <div className="sds_AppPage_Content">{content.length > 0 && content}</div>
    </div>
  );
};

export default AppPage;
