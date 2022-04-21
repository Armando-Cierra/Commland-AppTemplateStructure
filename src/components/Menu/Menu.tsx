import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import uniqid from 'uniqid';

import { Search } from '@2600hz/sds-react-components';
import { MenuOption } from '../index';
import type { Props } from './types';
import './menu.scss';

const Menu = ({
  children,
  className,
  search,
  show = false,
  onChange,
  maxHeight,
  width
}: Props) => {
  // Component Will Mount
  let content: any;

  const click = (e: any) => {
    if (onChange) {
      onChange(e);
    }
  };

  const loadContent = () => {
    if (children) {
      if (Array.isArray(children)) {
        content = [];
        children.map((element: any) => {
          if (element.type.name === 'MenuOption') {
            content = [
              ...content,
              <MenuOption
                value={element.props.value}
                onClick={(e: any) => {
                  click(e);
                }}
                key={uniqid('sds_Dropdwon_MenuOption')}
              >
                {element.props.children}
              </MenuOption>
            ];
          } else {
            content = [
              ...content,
              React.cloneElement(element, { key: uniqid() })
            ];
          }
        });
      } else if (children.type.name === 'MenuOption') {
        React.Children.map(children, (child) => {
          content = [
            ...content,
            <MenuOption
              value={children.props.value}
              onClick={(e: any) => {
                click(e);
              }}
            >
              {children.props.children}
            </MenuOption>
          ];
        });
      } else {
        content = children;
      }
    } else {
      content = NoContent;
    }
  };

  loadContent();

  // Component Mounted

  const [elements, setElements] = useState<any>(content);

  const filter = async (e: any) => {
    const { value } = e;

    if (value === '') {
      loadContent();
    } else if (children.length > 1) {
      content = [];

      await children.map((element: any) => {
        if (
          element.type.name === 'MenuOption' &&
          element.props.children.toLowerCase().includes(value.toLowerCase())
        ) {
          content.push(
            React.cloneElement(element, {
              onClick: click,
              key: uniqid('sds_Option_')
            })
          );
        }
      });
    } else if (
      children.type.name === 'MenuOption' &&
      children.props.value.includes(value)
    ) {
      content = React.cloneElement(children, {
        onClick: click
      });
    }

    if (content.length >= 1) {
      setElements(content);
    } else {
      setElements(NoMatchingResults);
    }
  };

  useEffect(() => {
    loadContent();
    setElements(content);
  }, [children]);

  return (
    <div
      className={classNames('sds_Menu', {
        sds_Menu_Hidden: !show,
        [String(className)]: className
      })}
      style={{
        maxHeight: maxHeight && maxHeight,
        width: width && width
      }}
    >
      {search && (
        <div className="sds_Menu_SearchBox">
          <Search
            id="menuSearch"
            name="menuSearch"
            placeholder="Search..."
            onChange={filter}
          />
        </div>
      )}
      <div className="sds_Menu_Section">{elements}</div>
    </div>
  );
};

const NoMatchingResults = () => (
  <div className="sds_Option sds_Option_NoResult">No matching result...</div>
);

const NoContent = () => (
  <div className="sds_Option sds_Option_NoResult">No content available...</div>
);

export default Menu;
