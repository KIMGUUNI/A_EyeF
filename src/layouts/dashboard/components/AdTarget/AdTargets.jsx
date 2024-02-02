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
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Invoice from "layouts/dashboard/components/AdTarget/AdTarget.jsx";
import { useContext } from "react";
import { CurrentAd } from "context/CurrentAd";

function AdTargets({color}) {
    const {currentAd} = useContext(CurrentAd)
    console.log(currentAd)
  return (
    <Card sx={{ height: "93%" }}>
      <MDBox pt={0} px={2} display="flex" justifyContent="space-between" alignItems="center">
      <MDBox
          variant="gradient"
          bgColor='error'
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            ads_click
          </Icon>
        </MDBox>
        <MDTypography variant="h5" fontWeight="medium" mt={2} mr={1} >
          광고 타겟
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice ad_target_age={`${currentAd.ad_target_age}`} ad_target_gender={`${currentAd.ad_target_gender}`}/>
        </MDBox>
      </MDBox>
    </Card>
  );
}

AdTargets.defaultProps = {
    color: "info",
  };
  
  // Typechecking props for the ComplexStatisticsCard
  AdTargets.propTypes = {
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
  };
export default AdTargets;
