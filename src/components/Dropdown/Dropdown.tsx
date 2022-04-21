import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames';

import { Telicon, Label } from '@2600hz/sds-react-components';
import { Menu } from '../index';
import type { Props } from './types';
import './dropdown.scss';

const Dropdown = ({
  className,
  label = '',
  info = '',
  name = '',
  id,
  defaultText = '',
  selectedValue,
  children,
  search = false,
  menuMaxHeight,
  menuWidth = '100%',
  helptext = '',
  error = false,
  errorMessage = '',
  disabled = false,
  menuPosition = 'Bottom-Left',
  onChange
}: Props) => {
  const content: any[] = [];

  const loadContent = () => {
    if (Array.isArray(children)) {
      children.map((item: any) => {
        content.push(item);
      });
    } else {
      content.push(children);
    }
  };

  loadContent();

  const getSelecteItemText = () => {
    if (selectedValue) {
      const filter = content.filter((item) => {
        if (item.props.value === selectedValue) {
          return item.props.children;
        }
        return null;
      });

      const text = filter.length !== 0 ? filter[0].props.children : '';

      return text;
    }
    return '';
  };

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(getSelecteItemText());
  const selectRef = useRef<any>(null);
  const componentRef = useRef<any>(null);

  const click = () => {
    if (!disabled) {
      selectRef.current.focus();
      setShow(!show);
    }
  };

  const change = (e: any) => {
    setSelectedItem(e.text);
    setShow(false);
    if (onChange) {
      if (e.description) {
        onChange({
          label,
          name,
          id,
          value: e.value,
          text: e.label,
          description: e.description
        });
      } else {
        onChange({
          label,
          name,
          id,
          value: e.value,
          text: e.label
        });
      }
    }
  };

  useEffect(() => {
    const detectTarget = (e: any) => {
      if (show && componentRef && !componentRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener('click', detectTarget);

    return () => document.removeEventListener('click', detectTarget);
  }, [show]);

  return (
    <div
      className={classNames('sds_Dropdown', {
        sds_Dropdown_Error: error,
        sds_Dropdown_Disabled: disabled,
        [String(className)]: className
      })}
      ref={componentRef}
    >
      {label && (
        <Label info={info} onClick={click}>
          {label}
        </Label>
      )}
      <div
        className={classNames('sds_Dropdown_Box', {
          [`sds_Dropdown_Box_${menuPosition}`]: menuPosition
        })}
      >
        <div
          className={classNames('sds_Dropdown_Select', {
            sds_Dropdown_Select_Empty:
              !selectedItem &&
              (defaultText === '' || defaultText === ' ' || !defaultText)
          })}
          {...(!disabled && { tabIndex: 0 })}
          {...(!disabled && { role: 'button' })}
          onClick={click}
          ref={selectRef}
        >
          {selectedItem && selectedItem !== '' ? selectedItem : defaultText}
          <div className="sds_Dropdown_Select_IconBox">
            {error && <Telicon name="warning--octagon" />}
            <Telicon name="carets-sortable" />
          </div>
        </div>
        <Menu
          search={search}
          show={show}
          maxHeight={menuMaxHeight}
          width={menuWidth}
          onChange={(e: any) => {
            change(e);
          }}
        >
          {children}
        </Menu>
      </div>
      {error && errorMessage !== '' ? (
        <span
          className={classNames('sds_Dropdown_HelpText', {
            sds_Dropdown_HelpText_Hidden: show
          })}
        >
          {errorMessage}
        </span>
      ) : (
        helptext && (
          <span
            className={classNames('sds_Dropdown_HelpText', {
              sds_Dropdown_HelpText_Hidden: show
            })}
          >
            {helptext}
          </span>
        )
      )}
    </div>
  );
};

export default Dropdown;
