/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import Cookies from "js-cookie";



function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [user_email, setUser_Email] = useState("");
  const [user_pw, setUser_Pw] = useState("");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
   /* eslint-disable no-unused-vars */
  const [user_rol, setUser_rol] = useState("");
  const expirationTime = 5 * 60 * 1000;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/A_Eye",
    withCredentials: true,
  });

  const handleSignIn = async () => {
    try {
      const userData = {
        user_email,
        user_pw,
      };


      const response = await axiosInstance.post("/api/sign-in", userData);
      const token = response.data.jwt;
      const idx = response.data.user_idx;

      if (token) {
        if (user_email == "admin") {
          alert("로그인 성공");
          Cookies.set("Admin", token, { expires: new Date(Date.now() + expirationTime) });
          sessionStorage.setItem('user_idx', idx);
          setUser_rol("Admin")
        } else {
          alert("로그인 성공");
          Cookies.remove("Admin")
          Cookies.set("User", token, { expires: new Date(Date.now() + expirationTime) });
          sessionStorage.setItem('user_idx', idx);
          setUser_rol("User")
        }

        window.location.href = 'http://localhost:3000/dashboard';
        // navigate("/dashboard");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };


  const getUserInfo = async () => {
    try {
      let token;

      const adminCookie = Cookies.get("Admin");
      const userCookie = Cookies.get("User");

      if (adminCookie) {
        token = adminCookie
      } else if (userCookie) {
        token = userCookie
      } else {
        alert("다시 로그인 해 주세요.")
        navigate("/authentication/sign-in");
      }


      const config = {
        headers: {
          Authorization: `Bearer${token}`
        }
      };
      console.log(config)
      const response = await axiosInstance.get("/api/prove", config);

      if (response.status === 200) {
        console.log("response: ", response.data)
        alert("검증 성공")
      }


    } catch (error) {
      alert("다시 로그인 해 주세요.")
      navigate("/authentication/sign-in");
    }
  }

  useEffect(() => {
    console.log("user_rol changed:", user_rol);
  }, [user_rol]);


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <button onClick={getUserInfo}>정보요청</button>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setUser_Email(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                onChange={(e) => setUser_Pw(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;