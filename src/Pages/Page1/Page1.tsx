import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Text,
  AppPage,
  AppPageActions,
  AppPageContent
} from '@code503/sds-react-components';
import { useStore } from 'store';
import './page1.scss';

const Page1 = () => {
  const { showMenu, setShowMenu, screenSize } = useStore();

  return (
    <AppPage
      pageTitle="Page 1"
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      screenWidth={screenSize.dynamicWidth}
    >
      <AppPageActions type="Actions" className="page1-actions">
        <Button>Base Action</Button>
        <Button type="Primary" icon="apps">
          {screenSize.dynamicWidth >= 767 ? 'Primary Action' : ''}
        </Button>
      </AppPageActions>
      <AppPageContent className="page1-content" type="Content">
        <Text.p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          repellendus dolorum hic sequi quisquam officia consequatur assumenda
          sit reiciendis labore? Exercitationem, at! Quasi saepe voluptates
          totam cupiditate ea obcaecati accusamus!
        </Text.p>
        <br />
        <Link to="/page-1/lvl-1">
          <Button>Lvl 1</Button>
        </Link>
      </AppPageContent>
    </AppPage>
  );
};

export default Page1;
