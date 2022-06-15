import React from 'react';

interface Props {
  type: 'Content';
  children: any;
  className?: string;
}

const AppPageContent = ({ children }: Props) => children;

export default AppPageContent;
