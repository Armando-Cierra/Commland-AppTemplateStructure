import React from 'react';
import { Page1, Page2, Page3, Lvl1, Lvl2 } from 'Pages';
import { Routes, Route } from 'react-router-dom';

const RoutesCollection = () => {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/page-1" element={<Page1 />} />
      <Route path="/page-1/lvl-1" element={<Lvl1 />} />
      <Route path="/page-1/lvl-1/lvl-2" element={<Lvl2 />} />
      <Route path="/page-2" element={<Page2 />} />
      <Route path="/page-3" element={<Page3 />} />
    </Routes>
  );
};

export default RoutesCollection;
