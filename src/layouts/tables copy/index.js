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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Data
import TblHeader from "./components/TblHeader";
import SelectVd from "components/S3/SelectVd"
import Date from "components/S3/Date"
function Tables2() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TblHeader>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white" marginLeft="3%">
                  광고 신청 현황
                </MDTypography>
              </MDBox>
              <div style={{ textAlign: 'center', marginTop:"2%" }}>
              <MDBox pt={3}>
                <SelectVd/>
              </MDBox>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white" marginLeft="3%">
                  광고 상위 리스트
                </MDTypography>
              </MDBox>
              <div style={{ textAlign: 'center', marginTop:"2%" }}>
              <MDBox pt={3}>
                <Date/>
              </MDBox>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </MDBox>
      </TblHeader>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables2;
