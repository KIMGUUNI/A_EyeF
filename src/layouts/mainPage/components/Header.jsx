import React from 'react'
import MDBox from "components/MDBox";
import MDTypography from 'components/MDTypography';
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MuiLink from "@mui/material/Link";

export const Header = () => {
    return (
        <MDBox mt={12} ml={"20%"} style={{ display: "flex", position: "fixed", alignItems: "center", justifyContent: "space-between", width: "70%", zIndex: "1000" }}>
            <MDTypography variant="h1" fontWeight="medium" color="white" >
                A-eye
            </MDTypography >
            <MDBox ml={"30%"} mr={"20%"} style={{ display: "flex", alignItems: "center" }} >

                <MDTypography component={MuiLink} href="/dashborad" variant="body1" color="white" display="flex">
                    <FacebookIcon fontSize='large' color="white" style={{ display: "flex", margin: "10" }} />
                    <GoogleIcon fontSize='large' color="white" style={{ display: "flex", margin: "10" }} />
                </MDTypography>
            </MDBox>
        </MDBox>
    )
}
