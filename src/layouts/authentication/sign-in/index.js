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
  const expirationTime = 10 * 60 * 1000;
  /* eslint-disable no-unused-vars */
  // const {setUserInfo} = useContext(UserInfo);

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
      const reToken = response.data.rjwt;
      const user_idx = response.data.user_idx;
      const user_name = response.data.user_name;
      const user_Email = response.data.user_email;
      const user_position = response.data.user_position;


      const UserInfo = {
        user_idx,
        user_name,
        user_Email,
        user_position
      }

      if (token) {
        if (user_email == "admin") {
          Cookies.set("Admin", token, { expires: new Date(Date.now() + expirationTime) });
          Cookies.set("reToken", reToken)
          sessionStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          setUser_rol("Admin")
        } else {
          Cookies.remove("Admin")
          Cookies.set("reToken", reToken)
          Cookies.set("User", token, { expires: new Date(Date.now() + expirationTime) });
          sessionStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          setUser_rol("User")
        }
        window.location.href = 'http://localhost:3000/dashboard';
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
        // 쿠키가 없을 때 --> 로그인이 아예 안된 경우
        alert("로그인을 해 주세요.")
        navigate("/authentication/sign-in");
      }

      const config = {
        headers: {
          Authorization: `Bearer${token}`
        }
      };

      const response = await axiosInstance.get("/api/prove", config);
      if (response.status === 200) {
        alert("검증 성공")
      }

    } catch (error) {
      //  토큰의 서명이 올바르지 않거나 토큰의 내용이 손상되었을 경우
      if (error.response.data == "토큰 검증에 실패했습니다.") {
        alert("권한이 없습니다. 다시 로그인 해주세요.")
        navigate("/authentication/sign-in");
        // 쿠키는 있지만 jwt가 만료되었을 때
      } else if (error.response.data == "토큰이 만료되었습니다.") {
        var jwtFromCookie = Cookies.get("reToken");
        if (jwtFromCookie) {
          const reTkken = {
            headers: {
              Authorization: `Bearer${jwtFromCookie}`
            }
          };

          try {
            // refresh 토큰을 이용해 access 토큰을 재발급
            const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));

            const queryParams = new URLSearchParams({
              user_name: loginVO.user_name,
              user_position: loginVO.user_position
            }).toString();

            const url = `/api/reProve?${queryParams}`;

            const response = await axiosInstance.get(url, reTkken);

            // const response = await axiosInstance.get("/api/reProve", reTkken, data);
            const newToken = response.data
            const adminCookie = Cookies.get("Admin");
            const userCookie = Cookies.get("User");

            if (adminCookie) {
              Cookies.set("Admin", newToken)
            } else if (userCookie) {
              Cookies.set("User", newToken)
            }

            alert("토큰이 갱신되었습니다.");
          } catch (error) {
            // refresh 토큰이 유효하지 않거나 발급 실패 등의 처리
            if (error.response.data == "다시 로그인 해주세요") {
              alert("권한이 없습니다. 다시 로그인 해주세요.");
            }
          }
        }

      }
    }
  }

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
          <button onClick={getUserInfo}>정보요청</button>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            A-eye
          </MDTypography>
        </MDBox>
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