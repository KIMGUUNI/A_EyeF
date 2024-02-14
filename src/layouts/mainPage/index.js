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
import MainNavbutton from "./components/MainNavbutton";
import "./CSS/Page.css";
import { currentMainPage } from "context/MainPage";

function mainPage() {
  const pages = [<Page1 />, <Page2 />, <Page3 />];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handlePageTransitionComplete = (Index) => {
    // 페이지 이동이 완료되었음을 알리는 이벤트 발생
    document.dispatchEvent(new Event(`pageTransitionComplete${Index}`));
  };

  const handleScroll = (event) => {

    const deltaY = event.deltaY;
    if (deltaY > 0 && currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (deltaY < 0 && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
    handlePageTransitionComplete(currentPageIndex);
  }


  return (
    <currentMainPage.Provider value={
      { currentPageIndex, setCurrentPageIndex }
    }>
      <div style={{ overflow: "hidden" }}>
        <Header></Header>
        <div className="main-page-transition-container" onWheel={handleScroll}>
          <div className={`main-page-component first-page ${currentPageIndex === 0 ? "main-page-active" : ""}`} >
            {pages[0]}
          </div>
          <div className={`main-page-component second-page ${currentPageIndex === 1 ? "main-page-active" : ""}`} style={{ transform: currentPageIndex === 1 ? { transform: "translateY(0%)" } : { transform: "translateY(100%)" } }}>
            {pages[1]}
          </div>
          <div className={`main-page-component third-page ${currentPageIndex === 2 ? "main-page-active" : ""}`} style={{ transform: currentPageIndex === 2 ? { transform: "translateY(0%)" } : { transform: "translateY(200%)" } }}>
            {pages[2]}
          </div>
        </div>
        <MainNavbutton pages={pages} value={currentPageIndex} />
      </div>
    </currentMainPage.Provider>
  );
}

export default mainPage;
