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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function AdTarget({ ad_target_age, ad_target_gender, noGutter }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={2.125} >
        <MDTypography display="block" variant="h6" fontWeight="medium" mb={2} >
          연령 :  {ad_target_age > 0 ? ad_target_age : 0}
        </MDTypography>
        <MDTypography display='flex' variant="h6" fontWeight="medium">
          성별 :  {ad_target_age > 0 ? ad_target_gender : "성별을 선택해주세요"}
        </MDTypography>
        
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
AdTarget.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
AdTarget.propTypes = {
  noGutter: PropTypes.bool,
};

export default AdTarget;
