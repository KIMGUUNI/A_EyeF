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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import AdTargets from "layouts/dashboard/components/AdTarget/AdTargets";

import * as React from 'react';
import { CurrentAd } from "context/CurrentAd";
// import { useEffect } from "react";


function Dashboard() {
  const [currentAd, setCurrentAd] = React.useState(0);
  const [monthAd, setMonthAd] = React.useState(0);
  // const [firstRender, setFirstRender] = React.useState(true);
  const [chartD, setChartD] = React.useState(
    {sales:{
      labels: [""],
      datasets:{label:"" , data:[]}
  }});
  const [chartBarD, setChartBarD] = React.useState(
    {
      labels: [],
      datasets: { label: "", data:[] },
    }
  )

  
  console.log(chartBarD.labels)

  return (
    <CurrentAd.Provider value={{ currentAd, setCurrentAd, monthAd, setMonthAd,chartD, setChartD, chartBarD, setChartBarD }}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  title="오늘 노출 횟수"
                  icon="leaderboard"
                  count={monthAd != null ? monthAd.day_count : 0}
                  percentage={{
                    color: chartBarD.datasets.data[chartBarD.datasets.data.length-1] - chartBarD.datasets.data[chartBarD.datasets.data.length-2] >= 0 ? "success" : "error" ,
                    amount: isNaN(chartBarD.datasets.data[chartBarD.datasets.data.length-1]) || chartBarD.datasets.data[chartBarD.datasets.data.length-2] === 0 ? "" :Math.round((chartBarD.datasets.data[chartBarD.datasets.data.length-1] / chartBarD.datasets.data[chartBarD.datasets.data.length-2] - 1) * 100) + "%" ,
                    label: `${isNaN(chartBarD.datasets.data[chartBarD.datasets.data.length-1]) || chartBarD.datasets.data[chartBarD.datasets.data.length-2] === 0 ? "일별 노출 횟수 " : "어제 보다"}`,
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="월별 노출 횟수"
                  count={monthAd != null ? monthAd.month_count : 0}
                  percentage={{
                    color: chartD.sales.datasets.data[chartD.sales.datasets.data.length-1] - chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] >= 0 ? "success" : "error" ,
                    amount: isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0 ? "" :Math.round((chartD.sales.datasets.data[chartD.sales.datasets.data.length-1] / chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] - 1) * 100) + "%" ,
                    label: `${isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0  ? "월별 노출 횟수 " : "전월 보다"}`,
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="최대 노출 지역"
                  count={monthAd != null ? monthAd.region_count : 0}
                  percentage={{
                    color: "success",
                    amount: `${isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0 ? "" : "점유율 " + Math.round(monthAd.region_count /currentAd.ad_expo_num *10000)/100+ "%" }`,
                    label: `${isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0 ? "가장 높은 지역" : monthAd.expoRegion}`
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="총 노출 횟수"
                  count={currentAd != null ? currentAd.ad_expo_num : 0}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsBarChart
                    color="info"
                    title="7일 노출 횟수"
                    date= {`${isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0  ? "월별 노출 횟수 기간 " : chartBarD.labels[0]+ " ~ " + chartBarD.labels[chartBarD.labels.length-1]}`}
                    chart={chartBarD}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="월별 노출 횟수"
                    date= {`${isNaN(chartD.sales.datasets.data[chartD.sales.datasets.data.length-1]) || chartD.sales.datasets.data[chartD.sales.datasets.data.length-2] === 0  ? "월별 노출 횟수 기간 " : chartD.sales.labels[0]+ " ~ " + chartD.sales.labels[chartD.sales.labels.length-1]}`}
                    chart={chartD.sales}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AdTargets />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <Projects />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </CurrentAd.Provider>
  );
}

export default Dashboard;
