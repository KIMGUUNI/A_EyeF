import React, { useContext, useEffect, useState } from 'react'
import "../CSS/MainNavbar.css"
import { currentMainPage } from 'context/MainPage';

const MainNavbutton = ({value, pages}) => {
  console.log(value, pages)

  const [buttonList, setButtonList] = useState([]);
  const {currentPageIndex, setCurrentPageIndex} = useContext(currentMainPage);
  


  const pageTrans =(e) =>{
    console.log(currentPageIndex)
    console.log(e.target.name)
    setCurrentPageIndex(parseInt(e.target.name))
    document.dispatchEvent(new Event(`pageTransitionComplete${parseInt(e.target.name-1)}`));
  }

  useEffect(()=>{
    setButtonList([pages.map((page,index)=>{
      return <button 
          key={index} name={index} className={`b ${currentPageIndex == parseInt(index) ? 'focused' : ''}`}
          onClick={(e)=>{pageTrans(e)}}
        ></button>
    })])

  },[pages])
  return (
    <div className='b-container'>
      {buttonList}
    </div>
  )
}

export default MainNavbutton