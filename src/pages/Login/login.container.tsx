import React, { useState, useDispatch } from "reactn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { setUserDetailReducer } from "../../reducers";
import { loginAPI } from "../../services/apis";
import { AlertStatusType, LoginValues } from "../../types";
import LoginView from "./login.view";

const Login = () => {
  const navigate = useNavigate();
  const setGlobalUserDetail = useDispatch(setUserDetailReducer);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {},
  });

  const [alertStatus, setAlertStatus] = useState<AlertStatusType>({
    show: false,
    message: "",
    type: undefined,
  });

  const handleLogin = handleSubmit(async (data: any) => {
    try {
      console.log("Values : ", data);

      const response = await loginAPI(data);
      setAlertStatus({
        message: response?.error || response.message,
        show: true,
        type: response?.error || response?.errors ? "error" : "success",
      });
      if (response.status === "success") {
        localStorage.setItem("USER_DATA", JSON.stringify(response));
        localStorage.setItem("AUTH_TOKEN", response.data?.token || "");

        setGlobalUserDetail();

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log("Response : ", response);
    } catch (error) {
      console.log("Error : ", error);
    }
  });

  return <LoginView {...{ register, errors, handleLogin, alertStatus }} />;
};

export default Login;
