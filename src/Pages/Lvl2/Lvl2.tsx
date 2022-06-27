import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Text,
  AppPage,
  AppPageContent,
  AppPageNav,
  AppPageNavNestedItem
} from '@2600hz/sds-react-components';
import { useStore } from 'store';

const Lvl2 = () => {
  const { showMenu, setShowMenu, screenSize } = useStore();

  return (
    <AppPage
      pageTitle="Page 1 - Lvl 2"
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      screenWidth={screenSize.dynamicWidth}
    >
      <AppPageNav type="NestedNav">
        <Link to="/page-1/lvl-1">
          <AppPageNavNestedItem>Page 1 - Lvl 1</AppPageNavNestedItem>
        </Link>
        <Link to="/">
          <AppPageNavNestedItem>Page 1</AppPageNavNestedItem>
        </Link>
      </AppPageNav>
      <AppPageContent type="Content">
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
      </AppPageContent>
    </AppPage>
  );
};

export default Lvl2;
