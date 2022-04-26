import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import RegisterView from "./register.view";

import { registerUserAPI } from "../../services/apis";
import { AlertStatusType, RegisterValues } from "../../types";

const Register = () => {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState<AlertStatusType>({
    show: false,
    message: "",
    type: undefined,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<RegisterValues>({
    defaultValues: {},
  });

  const password = useRef({});
  password.current = watch("password", "") || "";

  const handleRegister = handleSubmit(async (data) => {
    try {
      const response = await registerUserAPI(data);
      setAlertStatus({
        message: response?.error || response.message,
        show: true,
        type: response?.error || response?.errors ? "error" : "success",
      });
      if (response.status === "success") {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      console.log("Response : ", response);
    } catch (error) {
      console.log("Error : ", error);
    }
  });

  return (
    <RegisterView
      {...{ register, errors, password, handleRegister, alertStatus }}
    />
  );
};

export default Register;
