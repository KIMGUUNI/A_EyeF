// Billing 컴포넌트에서 useEffect를 사용하여 데이터 가져오기
import * as React from 'react';
import { Grid, Divider } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Header from 'layouts/billing/Header/';
import MDTypography from 'components/MDTypography';
import PayTable from './PayTable';


function Billing() {

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
            <Grid item xs={12} md={6} xl={4} sx={{ display: 'flex' }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}></Grid>
          </Grid>
          <MDBox p={0} mb={-5} mt={-3}>
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
                결제 광고 리스트
              </MDTypography>
            </MDBox>
            <PayTable/>
            <br />

            <br />
            <br />
            <br />
            <br />
            {/* 나머지 코드 */}
          </MDBox>
        </MDBox>

      </Header>
    </DashboardLayout>
  );
}

export default Billing;