import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables"; // 추가
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Cookies from "js-cookie";
import MainPage from "layouts/mainPage";
import Icon from "@mui/material/Icon";
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tables2 from "layouts/tables copy";
import NotFoundPage from "layouts/notFoundPage/NotFoundPage";
// User와 Admin 쿠키를 가져옵니다.
/* const [userCookie, setUserCookie] = useState(false)
const [adminCookie, setAdminCookie] = useState(false); */

const userCookie = Cookies.get("User");
const adminCookie = Cookies.get("Admin"); 

// 모든 routes를 설정합니다.
const routes = [];

// Admin 쿠키가 있는 경우
if (adminCookie) {
  routes.push(
    {
      type: "collapse",
      name: "대시보드",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "광고 신청",
      key: "tables",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables",
      component: <Tables />,
    },
    {
      type: "collapse",
      name: "결제",
      key: "billing",
      icon: <Icon fontSize="small">receipt_long</Icon>,
      route: "/billing",
      component: <Billing />,
    },
    {
      type: "collapse",
      name: "마이페이지",
      key: "profile",
      icon: <Icon fontSize="small">person</Icon>,
      route: "/profile",
      component: <Profile />,
    },
    {
      type: "collapse",
      name: "로그인",
      key: "sign-in",
      icon: <Icon fontSize="small">key</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "회원가입",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
    {
      type: "collapse",
      name: "메인화면",
      key: "MainPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/mainPage",
      component: <MainPage />,
    },
    {
      type: "collapse",
      name: "관리자 페이지",
      key: "tables2",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables2",
      component: <Tables2 />,
    },
    {
      type: "collapse",
      name: "광고 송출",
      key: "notifications",
      icon: <Icon fontSize="small">monitor</Icon>,
      route: "/notifications",
      component: <Notifications />,
    },
    {
      name: "페이지오류",
      key: "NotFoundPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/NotFoundPage",
      component: <NotFoundPage />
    },
  );
} else if (userCookie) { // User 쿠키가 있는 경우
  routes.push(
    {
      type: "collapse",
      name: "로그인",
      key: "sign-in",
      icon: <Icon fontSize="small">key</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "대시보드",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "회원가입",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
    {
      type: "collapse",
      name: "메인화면",
      key: "MainPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/mainPage",
      component: <MainPage />,
    },
    {
      name: "페이지오류",
      key: "NotFoundPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/NotFoundPage",
      component: <NotFoundPage />
    },

  );
} else { // 어느 쿠키도 없는 경우
  routes.push(
    {
      type: "collapse",
      name: "로그인",
      key: "sign-in",
      icon: <Icon fontSize="small">key</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "회원가입",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
    {
      type: "collapse",
      name: "대시보드",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "메인화면",
      key: "MainPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/mainPage",
      component: <MainPage />,
    },
    {
      name: "페이지오류",
      key: "NotFoundPage",
      icon: <Icon fontSize="small">home_icon</Icon>,
      route: "/NotFoundPage",
      component: <NotFoundPage />
    },
  );
}

export default routes;