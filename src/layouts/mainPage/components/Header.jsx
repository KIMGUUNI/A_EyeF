import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from 'components/MDTypography';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [hasCookie, setHasCookie] = useState(false);

    const logoutHandler = async () => {
        try {
            // 여기에서 로그아웃 동작 수행
            localStorage.clear();
            sessionStorage.clear();

            document.cookie = "Admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "User=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/dashboard";
        } catch (error) {
            // console.error(error);
        }
    };

    useEffect(() => {
        const adminCookie = document.cookie.includes('Admin');
        const userCookie = document.cookie.includes('User');
        setHasCookie(adminCookie || userCookie);
    }, []);

    return (
        <MDBox mt={12} ml={"20%"} style={{ display: "flex", position: "fixed", alignItems: "center", justifyContent: "space-between", width: "70%", zIndex: "1000" }}>
            <MDTypography variant="h1" fontWeight="medium" color="white" >
                A-eye
            </MDTypography >
            <MDBox ml={"10%"} mr={"20%"} style={{ display: "flex", alignItems: "center" }} >

                <Link to={"/dashboard"}>
                    <HomeIcon fontSize='large' color="white" style={{ display: "flex", margin: "10" }} />
                </Link>
                {hasCookie ? (
                    <Link>
                        <KeyIcon fontSize="large" color="white" style={{ display: 'flex', margin: '10' }} onClick={logoutHandler} />
                    </Link>
                ) : (
                    <Link to={'/authentication/sign-in'}>
                        <KeyIcon fontSize="large" color="white" style={{ display: 'flex', margin: '10' }} />
                    </Link>
                )}
            </MDBox>
        </MDBox>
    )
}
