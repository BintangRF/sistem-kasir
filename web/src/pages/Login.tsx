import React from "react";
import { useForm } from "react-hook-form";
import { ILoginFormInputs, loginSchema, useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "../sharedComponent/FormWrapper";
import { FormInputText } from "../sharedComponent/FormInputText";
import { FormButton } from "../sharedComponent/FormButton";
import { FormInputPassword } from "../sharedComponent/FormInputPassword";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { login, isLoadingLogin } = useAuth();

  const form = useForm<ILoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILoginFormInputs) => {
    login(data, {
      onSuccess: () => {
        localStorage.setItem("isLogin", "true");
        navigate("/");
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 350,
        margin: "auto auto",
        height: "100vh",
        placeContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <FormWrapper form={form} onSubmit={onSubmit}>
        <FormInputText
          name="username"
          defaultValue="admin"
          placeholder="Username"
        />

        <FormInputPassword
          name="password"
          defaultValue="adminpassword123"
          placeholder="Password"
        />

        <FormButton disabled={isLoadingLogin} loading={isLoadingLogin}>
          Login
        </FormButton>
      </FormWrapper>
    </div>
  );
};

export default Login;
