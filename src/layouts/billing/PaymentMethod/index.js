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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import Dialog from "@mui/material/Dialog";
import { useState, useEffect} from "react";
import Payment from "../Payment";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentMethod({ result }) {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    if (result) {
      let sum = 0;
      result.forEach(row => {
        // 금액이 숫자인 경우에만 합산
        if (!isNaN(row.금액)) {
          sum += parseInt(row.금액);
        }
      });
      setTotalAmount(sum);
    }
  }, [result]);

  const axiosInstance = axios.create({
    baseURL: "http://43.201.117.185:8089/A_Eye",
    withCredentials: true,
  });

  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const handleOpenAddCardModal =  async() => {
    await getUserInfo()
    setIsAddCardModalOpen(true);
  };

  const handleCloseAddCardModal = () => {
    setIsAddCardModalOpen(false);
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
 
       await axiosInstance.get("/api/prove", config);

    } catch (error) {
      //  토큰의 서명이 올바르지 않거나 토큰의 내용이 손상되었을 경우
      if (error.response.data == "토큰 검증에 실패했습니다.") {
        alert("다시 로그인 해주세요.")
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
              user_position: loginVO.user_position,
              user_idx: loginVO.user_idx
              //user_idx:loginVO.user_idx
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

          } catch (error) {
            // refresh 토큰이 유효하지 않거나 발급 실패 등의 처리
            if (error.response.data == "다시 로그인 해주세요") {
              alert("다시 로그인 해주세요.")
              navigate("/authentication/sign-in");
            }
          }
        }

      }
    }
  }

  return (
    <Card id="delete-account">
        <MDButton variant="gradient" color="dark" onClick={handleOpenAddCardModal}
        style={{ minWidth: '200px', minHeight: '70px', fontSize: '1.2rem' }}>
          &nbsp; 결제하기
        </MDButton>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
      <Dialog open={isAddCardModalOpen} onClose={handleCloseAddCardModal}>
        {isAddCardModalOpen && <Payment onCloseModal={handleCloseAddCardModal} totalAmount={totalAmount} result={result} />}
      </Dialog>
    </Card>
  );
}

export default PaymentMethod;
