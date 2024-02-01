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





// import { useState } from "react";

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


// 추가된 코드
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ResponsiveLine } from '@nivo/line' // 라인 차트



function Notifications() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const data = [
    {
      "id": "japan",
      "color": "hsl(226, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 199
        },
        {
          "x": "helicopter",
          "y": 263
        },
        {
          "x": "boat",
          "y": 216
        },
        {
          "x": "train",
          "y": 147
        },
        {
          "x": "subway",
          "y": 81
        },
        {
          "x": "bus",
          "y": 239
        },
        {
          "x": "car",
          "y": 86
        },
        {
          "x": "moto",
          "y": 59
        },
        {
          "x": "bicycle",
          "y": 22
        },
        {
          "x": "horse",
          "y": 194
        },
        {
          "x": "skateboard",
          "y": 269
        },
        {
          "x": "others",
          "y": 120
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(49, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 197
        },
        {
          "x": "helicopter",
          "y": 198
        },
        {
          "x": "boat",
          "y": 126
        },
        {
          "x": "train",
          "y": 297
        },
        {
          "x": "subway",
          "y": 138
        },
        {
          "x": "bus",
          "y": 20
        },
        {
          "x": "car",
          "y": 158
        },
        {
          "x": "moto",
          "y": 243
        },
        {
          "x": "bicycle",
          "y": 183
        },
        {
          "x": "horse",
          "y": 7
        },
        {
          "x": "skateboard",
          "y": 253
        },
        {
          "x": "others",
          "y": 228
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(359, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 215
        },
        {
          "x": "helicopter",
          "y": 126
        },
        {
          "x": "boat",
          "y": 256
        },
        {
          "x": "train",
          "y": 236
        },
        {
          "x": "subway",
          "y": 118
        },
        {
          "x": "bus",
          "y": 201
        },
        {
          "x": "car",
          "y": 66
        },
        {
          "x": "moto",
          "y": 135
        },
        {
          "x": "bicycle",
          "y": 115
        },
        {
          "x": "horse",
          "y": 198
        },
        {
          "x": "skateboard",
          "y": 239
        },
        {
          "x": "others",
          "y": 106
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(30, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 112
        },
        {
          "x": "helicopter",
          "y": 29
        },
        {
          "x": "boat",
          "y": 27
        },
        {
          "x": "train",
          "y": 245
        },
        {
          "x": "subway",
          "y": 151
        },
        {
          "x": "bus",
          "y": 45
        },
        {
          "x": "car",
          "y": 269
        },
        {
          "x": "moto",
          "y": 299
        },
        {
          "x": "bicycle",
          "y": 7
        },
        {
          "x": "horse",
          "y": 266
        },
        {
          "x": "skateboard",
          "y": 118
        },
        {
          "x": "others",
          "y": 271
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(355, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 10
        },
        {
          "x": "helicopter",
          "y": 246
        },
        {
          "x": "boat",
          "y": 68
        },
        {
          "x": "train",
          "y": 300
        },
        {
          "x": "subway",
          "y": 41
        },
        {
          "x": "bus",
          "y": 158
        },
        {
          "x": "car",
          "y": 141
        },
        {
          "x": "moto",
          "y": 282
        },
        {
          "x": "bicycle",
          "y": 41
        },
        {
          "x": "horse",
          "y": 29
        },
        {
          "x": "skateboard",
          "y": 190
        },
        {
          "x": "others",
          "y": 78
        }
      ]
    }
  ]



  const MyResponsiveLine = (props) => (
    <ResponsiveLine
      data={props.data}
      margin={{ right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )


  return (


    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3} sx={{ textAlign: 'right' }}>




        <div style={{ marginBottom: 20 }}>
          <FormControl sx={{ minWidth: 150, marginRight: '10%', height: '60px' }}>
            <InputLabel id="demo-simple-select-autowidth-label" sx={{ fontSize: '17px', height: '60px' }}>검색</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth
              label="Age"
              sx={{ height: '45px' }}
            >
              <MenuItem value="">
                <em>광고</em>
              </MenuItem>
              <MenuItem value={1}>광고1</MenuItem>
              <MenuItem value={2}>광고2</MenuItem>
              <MenuItem value={3}>광고3</MenuItem>
            </Select>
          </FormControl>
        </div>



        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} style={{ textAlign: 'center' }}>
                <MDTypography variant="h5">광고 이름</MDTypography>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>

            <Card style={{  textAlign: 'left', width: '100%', marginBottom: "10px", display: 'flex' }}>
              <MDTypography variant="h5"  style={{margin :"20px" }}>Chart1</MDTypography>
                <div style={{ height: '400px', width: '100%', margin : "10px" }}>
                  <MyResponsiveLine data={data} />
                </div>
            </Card>


            <Card style={{  textAlign: 'left', width: '100%', marginBottom: "10px", display: 'flex' }}>
              <MDTypography variant="h5"  style={{margin :"20px" }}>Chart1</MDTypography>
                <div style={{ height: '400px', width: '100%', margin : "10px" }}>
                  <MyResponsiveLine data={data} />
                </div>
            </Card>


            <Card style={{  textAlign: 'left', width: '100%', marginBottom: "10px", display: 'flex' }}>
              <MDTypography variant="h5"  style={{margin :"20px" }}>Chart1</MDTypography>
                <div style={{ height: '400px', width: '100%', margin : "10px" }}>
                  <MyResponsiveLine data={data} />
                </div>
            </Card>

          </Grid>



        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;