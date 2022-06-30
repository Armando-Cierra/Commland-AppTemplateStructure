import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Text,
  AppPage,
  AppPageContent,
  AppPageNav,
  AppPageNavItem,
  AppPageActions
} from '@code503/sds-react-components';
import { useStore } from 'store';

const Lvl1 = () => {
  const { showMenu, setShowMenu, screenSize } = useStore();

  return (
    <AppPage
      pageTitle="Page 1 - Lvl 1"
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      screenWidth={screenSize.dynamicWidth}
    >
      <AppPageNav type="Nav">
        <Link to="/page-1">
          <AppPageNavItem>Page 1</AppPageNavItem>
        </Link>
      </AppPageNav>
      <AppPageActions type="Actions">
        <Button>Example</Button>
      </AppPageActions>
      <AppPageContent type="Content">
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          sunt fuga cumque! Quaerat ipsa consequatur quasi hic dolorum? Quasi
          impedit quisquam atque totam dignissimos illum numquam nobis eum hic
          fugiat.
        </Text.p>
        <br />
        <Link to="/page-1/lvl-1/lvl-2">
          <Button>Lvl 2</Button>
        </Link>
      </AppPageContent>
    </AppPage>
  );
};

export default Lvl1;
