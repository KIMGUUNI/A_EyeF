import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import Board from "layouts/profile/components/Board";
import Invoice from "layouts/billing/Invoice";

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
          <MDBox p={0} mb={-5} mt={-5}>
            <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
              <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
              <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
              <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
              <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
              <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter />
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
      <Board />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;