import React from 'react'
import MDBox from "components/MDBox";
import MDTypography from 'components/MDTypography';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <MDBox mt={12} ml={"20%"} style={{ display: "flex", position: "fixed", alignItems: "center", justifyContent: "space-between", width: "70%", zIndex: "1000" }}>
            <MDTypography variant="h1" fontWeight="medium" color="white" >
                A-eye
            </MDTypography >
            <MDBox ml={"10%"} mr={"20%"} style={{ display: "flex", alignItems: "center" }} >

                <Link to={"/dashboard"}>
                    <HomeIcon fontSize='large' color="white" style={{ display: "flex", margin: "10" }} />
                </Link>
                <Link to={"/authentication/sign-in"}>
                    <KeyIcon fontSize='large' color="white" style={{ display: "flex", margin: "10" }} />
                </Link>
            </MDBox>
        </MDBox>
    )
}
