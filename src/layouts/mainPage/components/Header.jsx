import React from 'react'
import MDBox from "components/MDBox";
import MDTypography from 'components/MDTypography';
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";


export const Header = () => {
  return (
    <MDBox mt={15} ml={"20%"} style={{display : "flex", position : "fixed", alignItems : "center", justifyContent: "space-between", width:"70%", zIndex: "1000"}}>
        <MDTypography variant="h1" fontWeight="medium" color="white" >
                A_Eye
        </MDTypography >
        <MDBox ml ={"50%"} mr ={"30%"} style={{display : "flex", alignItems : "center"}} >
            <FacebookIcon fontSize='large' color="white" style={{display : "flex", margin: "10"}} />
            <GoogleIcon fontSize='large' color="white" style={{display : "flex", margin: "10"}} />
        </MDBox>
    </MDBox>
  )
}
