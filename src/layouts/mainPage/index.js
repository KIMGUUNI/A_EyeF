/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 */
import React, { useState } from "react";
import Page1 from "./PageIndex/Page1";
import Page2 from "./PageIndex/Page2";
import Page3 from "./PageIndex/Page3";
import { Header } from "./components/Header";


function mainPage() {
  const pages =  [<Page1/>, <Page2/>, <Page3/>];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleScroll = (event) =>{

    const deltaY = event.deltaY;
    if(deltaY > 0 && currentPageIndex < pages.length -1){
      setCurrentPageIndex(currentPageIndex +1 );
    } else if(deltaY < 0 && currentPageIndex > 0){
      setCurrentPageIndex(currentPageIndex - 1);
    }

  }


  return (
    <div style={{overflow :"hidden"}}>
      <Header></Header>
      <div onWheel={handleScroll}>
        {pages[currentPageIndex]}
      </div>
    </div>
  );
}

export default mainPage;
