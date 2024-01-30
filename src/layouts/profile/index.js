import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Rayout from "layouts/profile/components/Rayout"
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";


function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              {/* 왼쪽 위 */}
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}></Grid>
          </Grid>
          {/* 여기다 글 작성 가능 */}
          dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dassdddddddddd
        dsaadsasddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dassddddddddddddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dassddddddddddddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dassdddddddddd
        </MDBox>
      </Header>
      <Rayout>
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasaddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
        dassdddddddddd
        das
        dashboardasddsasad
        dashboardasddsasaddasasd
        dashboardasddsasaddasasddsaasdasdsd
        dassddddddddddsd
        dashboardasddsasaddasasddsaasdasdsd
        dsaadsas
      </Rayout>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
