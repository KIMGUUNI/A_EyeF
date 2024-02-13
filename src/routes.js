import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables"; // 추가
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Cookies from "js-cookie";
import Icon from "@mui/material/Icon";
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

// User와 Admin 쿠키를 가져옵니다.
/* const [userCookie, setUserCookie] = useState(false)
const [adminCookie, setAdminCookie] = useState(false); */

const userCookie = Cookies.get("User");
const adminCookie = Cookies.get("Admin"); 

/* useEffect(()=> {
  try{
    setUserCookie(Cookies.get("User"))
    setAdminCookie(Cookies.get("Admin"))
  }
  catch(error){
    error
  }
  
},[]) */

// 모든 routes를 설정합니다.
const routes = [];

// Admin 쿠키가 있는 경우
if (adminCookie) {
  routes.push(
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "Tables",
      key: "tables",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables",
      component: <Tables />,
    },
    {
      type: "collapse",
      name: "Billing",
      key: "billing",
      icon: <Icon fontSize="small">receipt_long</Icon>,
      route: "/billing",
      component: <Billing />,
    },
    {
      type: "collapse",
      name: "Notifications",
      key: "notifications",
      icon: <Icon fontSize="small">notifications</Icon>,
      route: "/notifications",
      component: <Notifications />,
    },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      icon: <Icon fontSize="small">person</Icon>,
      route: "/profile",
      component: <Profile />,
    },
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      icon: <Icon fontSize="small">login</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
  );
} else if (userCookie) { // User 쿠키가 있는 경우
  routes.push(
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      icon: <Icon fontSize="small">login</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },

  );
} else { // 어느 쿠키도 없는 경우
  routes.push(
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      icon: <Icon fontSize="small">login</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment_ind</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
  );
}

export default routes;