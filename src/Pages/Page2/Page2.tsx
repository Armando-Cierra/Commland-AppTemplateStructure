import React from 'react';
import { Text, AppPage, AppPageContent } from '@2600hz/sds-react-components';
import { useStore } from 'store';

const Page2 = () => {
  const { showMenu, setShowMenu, screenSize } = useStore();

  return (
    <AppPage
      pageTitle="Page 2"
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      screenWidth={screenSize.dynamicWidth}
    >
      <AppPageContent type="Content">
        <Text.p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          soluta expedita, sint vitae error nesciunt pariatur, minima,
          exercitationem maxime consectetur recusandae optio quibusdam illo
          corrupti blanditiis illum quae porro tempore?
        </Text.p>
      </AppPageContent>
    </AppPage>
  );
};

export default Page2;
