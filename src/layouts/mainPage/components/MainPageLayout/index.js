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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import bgImage2 from "assets/images/bg-reset-cover.jpeg";
import bgImage3 from "assets/images/bg-sign-up-cover.jpeg";
import MDTypography from "components/MDTypography";


function MainPageLayout({ image, children }) {
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="110%"
        minHeight="200vh"
      >
      
      <MDBox px={1} width="100%" height="100vmax" mx="auto" >

        <Grid display="inline-flex" container spacing={1} height="20%" width="100%">
            <MDBox display="flex" mt={15} width ="100%" minHeight="20vh"
              sx={{
                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                  image &&
                  `${linearGradient(
                    rgba(gradients.dark.main, 0.6),
                    rgba(gradients.dark.state, 0.6)
                  )}, url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                
              }}>
            </MDBox>
        </Grid>
        <MDBox minHeight="20px">
        <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
          안녕하세요 A_Eye 메인 페이지 입니다.
          </MDTypography>
        </MDBox>
          <Grid display="inline-flex" container spacing={1} height="20%" width="100%">
            <MDBox display="flex" mt={20} width ="100%" minHeight="20vh"
              sx={{
                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                bgImage2 &&
                  `${linearGradient(
                    rgba(gradients.dark.main, 0.6),
                    rgba(gradients.dark.state, 0.6)
                  )}, url(${bgImage2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                
              }}>
            </MDBox>
        </Grid>
        <MDBox>
        <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
          여기에 저희 기업이라고 가장하고 소개하는 글을 적을 예정입니다.
          </MDTypography>
        </MDBox>
        <Grid display="inline-flex" container spacing={1} height="20%" width="100%">
            <MDBox display="flex" mt={20} width ="100%" minHeight="20vh"
              sx={{
                backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                bgImage3 &&
                  `${linearGradient(
                    rgba(gradients.dark.main, 0.6),
                    rgba(gradients.dark.state, 0.6)
                  )}, url(${bgImage3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                
              }}>
            </MDBox>
        </Grid>
        <Grid mt={40} display="inline-flex" container spacing={1}>
              {children}
            {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            </Grid> */}
          </Grid>
      </MDBox>
      </MDBox>
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
MainPageLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MainPageLayout;
