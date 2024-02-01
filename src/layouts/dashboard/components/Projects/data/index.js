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
import MDProgress from "components/MDProgress";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "광고", accessor: "companies", width: "25%", align: "left" },
      { Header: "타겟 연령", accessor: "members", width: "10%", align: "center" },
      { Header: "타겟 성별", accessor: "budget", align: "center" },
      { Header: "노출 횟수", accessor: "ad_target_gender", align: "center" },
      { Header: "결제일", accessor: "pay_date", align: "center" },
      { Header: "시작 날짜", accessor: "pay_start_date", align: "center" },
      { Header: "종료 날짜", accessor: "pay_end_date", align: "center" },
      { Header: "승인", accessor: "completion", align: "center" },
      
    ],

    rows: [
      {
        companies: <Company image={logoXD} name="여기에" />,
        members: (
          <MDBox display="flex" py={1} >
            10
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            남 
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="center">
            <CancelIcon fontSize="medium"/>
            <CheckCircleIcon fontSize="medium" />
          </MDBox>
        ),
        ad_target_gender :(
          <MDBox>
            1
          </MDBox>
        ),
        pay_date :(
          <MDBox>
            Date
          </MDBox>
        ),
        pay_start_date :(
          <MDBox>
            Start_Date
          </MDBox>
        ),
        pay_end_date :(
          <MDBox>
            End_Date
          </MDBox>
        )
      },
      {
        companies: <Company image={logoAtlassian} name="데이터를" />,
        members: (
          <MDBox display="flex" py={1}>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            여
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoSlack} name="넣는 거구나" />,
        members: (
          <MDBox display="flex" py={1}>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            여
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoSpotify} name="잠이안와" />,
        members: (
          <MDBox display="flex" py={1}>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            여
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoJira} name="죽겠다" />,
        members: (
          <MDBox display="flex" py={1}>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            여
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={25} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoInvesion} name="에휴" />,
        members: (
          <MDBox display="flex" py={1}>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            여
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={40} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}
