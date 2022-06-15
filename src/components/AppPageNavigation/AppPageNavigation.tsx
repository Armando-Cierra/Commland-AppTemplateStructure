import React from 'react';

interface Props {
  type: 'Navigation' | 'NestedNavigation';
  children: any;
}

const AppPageNavigation = ({ children }: Props) => children;

export default AppPageNavigation;
