import axiosInstance from './axiosInstance'; // axios 인스턴스 가져오기
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const getUserInfoInterceptor = async () => {
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
      return Promise.reject("로그인이 필요합니다.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axiosInstance.get("/api/prove", config);
    if (response.status === 200) {
      alert("검증 성공")
    }

  } catch (error) {
    //  토큰의 서명이 올바르지 않거나 토큰의 내용이 손상되었을 경우
    if (error.response.data === "토큰 검증에 실패했습니다.") {
      alert("권한이 없습니다. 다시 로그인 해주세요.")
      navigate("/authentication/sign-in");
      // 쿠키는 있지만 jwt가 만료되었을 때
    } else if (error.response.data === "토큰이 만료되었습니다.") {
      alert("시간 만료");
      // 토큰을 재발급하고 새로운 토큰으로 다시 요청을 보냅니다.
      await reprove();
    }
  }
};

const reprove = async () => {
  try {
    // refresh 토큰을 이용해 access 토큰을 재발급
    const jwtFromCookie = Cookies.get("reToken");
    if (jwtFromCookie) {
      const reToken = {
        headers: {
          Authorization: `Bearer ${jwtFromCookie}`
        }
      };

      const loginVO = JSON.parse(sessionStorage.getItem('UserInfo'));

      const queryParams = new URLSearchParams({
        user_name: loginVO.user_name,
        user_position: loginVO.user_position,
        user_idx: loginVO.user_idx
      }).toString();

      const url = `/api/reProve?${queryParams}`;

      const response = await axiosInstance.get(url, reToken);
      const newToken = response.data;
      const adminCookie = Cookies.get("Admin");
      const userCookie = Cookies.get("User");

      if (adminCookie) {
        Cookies.set("Admin", newToken)
      } else if (userCookie) {
        Cookies.set("User", newToken)
      }

      alert("토큰이 갱신되었습니다.");
      // 재발급된 토큰으로 다시 getUserInfo를 호출하여 검증합니다.
      await getUserInfoInterceptor();
    }
  } catch (error) {
    // refresh 토큰이 유효하지 않거나 발급 실패 등의 처리
    if (error.response.data === "다시 로그인 해주세요") {
      console.log(error)
    }
  }
};

export default getUserInfoInterceptor;
