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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/a-big-company-lobby2.png";
import axios from "axios";
import Cookies from "js-cookie";
// import API from "components/API"
/* eslint-disable no-unused-vars */
import { AdHostInfo } from "context/AdHostInfo";


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [user_email, setUser_Email] = useState("");
  const [user_pw, setUser_Pw] = useState("");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  /* eslint-disable no-unused-vars */
  const [user_rol, setUser_rol] = useState("");
  /* eslint-disable no-unused-vars */
  // const {setUserInfo} = useContext(UserInfo);

  const axiosInstance = axios.create({
    baseURL: "http://43.201.117.185:8089/A_Eye",
  });

  const handleSignIn = async () => {
    try {
      const userData = {
        user_email,
        user_pw,
      };


      const response = await axiosInstance.post("/api/sign-in", userData);
      const token = response.data.jwt;
      const reToken = response.data.rjwt;
      const user_idx = response.data.user_idx;
      const user_name = response.data.user_name;
      const user_Email = response.data.user_email;
      const user_position = response.data.user_position;

      console.log(response)

      const UserInfo = {
        user_idx,
        user_name,
        user_Email,
        user_position
      }

      if (token) {
        if (user_email == "admin") {
          Cookies.set("Admin", token, { expires: null });
          Cookies.set("reToken", reToken)
          sessionStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          setUser_rol("Admin")
        } else {
          Cookies.remove("Admin")
          Cookies.set("reToken", reToken)
          Cookies.set("User", token, { expires: null });
          sessionStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          setUser_rol("User")
        }
        window.location.href = '/dashboard';
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  
 

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
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            A-eye
          </MDTypography>
        </MDBox>
             {/*  <button onClick={getUserInfo}>정보요청</button> */}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="이메일"
                variant="standard"
                fullWidth
                onChange={(e) => setUser_Email(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="비밀번호"
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
                &nbsp;&nbsp; 자동 로그인
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                로그인
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                계정이 없으신가요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  회원 가입
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