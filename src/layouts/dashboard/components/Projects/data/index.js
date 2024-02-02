/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CurrentAd } from "context/CurrentAd";

// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const {currentAd, setCurrentAd} = useContext(CurrentAd);
  const {monthAd, setMonthAd} = useContext(CurrentAd)
  const [adRows, setAdRows] = useState([]);
  
  //const [currentAd, setCurrentAd] = useState(null);

  async function getAd() {

    const user = await JSON.parse(sessionStorage.getItem('loginVO'))

    if (user != null) {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8089/A_Eye",
        withCredentials: true
      })
      axiosInstance.post("/api/getUserAds", { user_idx: user.user_idx })
        .then(res => {
          sessionStorage.setItem('adVO', JSON.stringify(res.data));
          getAdList()
          
          
        })
    }
  }


  async function getAdList() {
    const ad = await JSON.parse(sessionStorage.getItem('adVO'))
    setCurrentAd(ad[0].ad_idx)
    
    if (ad != null) {
      //setCurrentAd(ad[0].ad_idx)
    }
    if (ad != null) {
      setAdRows(ad.map((item) => ({
        companies: <span onClick={()=>{setCurrentAd(item), getMonthAd(item.ad_idx)}}><Company  image={logoXD} name={item.ad_name} /></span>, // You can customize the name as per your requirement
        ad_target_age: (
          <MDBox display="flex" py={1}>
            {item.ad_target_age}
          </MDBox>
        ),
        ad_target_gender: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {item.ad_target_gender}
          </MDTypography>
        ),
        ad_approval: (
          <MDBox width="8rem" textAlign="center">
            {item.ad_approval == 'N' ? <CancelIcon fontSize="medium" /> :
              <CheckCircleIcon fontSize="medium" />}
          </MDBox>
        ),
        ad_expo_num: (
          <MDBox>
            {item.ad_expo_num}
          </MDBox>
        ),
        pay_date: (
          <MDBox>
            Date
          </MDBox>
        ),
        pay_start_date: (
          <MDBox>
            Start_Date
          </MDBox>
        ),
        pay_end_date: (
          <MDBox>
            End_Date
          </MDBox>
        )
      })));
    }
    
  }

  async function getMonthAd(item) {

      const adMonthAxiosInstance = await axios.create({
        baseURL: "http://localhost:8089/A_Eye",
        withCredentials: true
      })
      adMonthAxiosInstance.post("/api/getMonthAds", { ad_idx: item })
        .then(res => {
          //sessionStorage.setItem('adVO', JSON.stringify(res.data));
          console.log(res.data)
          setMonthAd(res.data[0])
          console.log(monthAd)         
          
        })
    
  }

  useEffect(() => {

    getAd()

  }, [console.log(currentAd)])

  


  return {
    columns: [
      { Header: "광고", accessor: "companies", width: "25%", align: "left" },
      { Header: "타겟 연령", accessor: "ad_target_age", width: "10%", align: "center" },
      { Header: "타겟 성별", accessor: "ad_target_gender", align: "center" },
      { Header: "노출 횟수", accessor: "ad_expo_num", align: "center" },
      { Header: "결제일", accessor: "pay_date", align: "center" },
      { Header: "시작 날짜", accessor: "pay_start_date", align: "center" },
      { Header: "종료 날짜", accessor: "pay_end_date", align: "center" },
      { Header: "승인", accessor: "ad_approval", align: "center" },

    ],

    rows:
      adRows
  };


}
data.defaultProps = {
  ad_target_age: "1",
  companies: "1",
  ad_target_gender: "1",
  ad_expo_num: "1",
  pay_date: "1",
  pay_start_date: "1",
  pay_end_date: "1",
  ad_approval: "1",
};
