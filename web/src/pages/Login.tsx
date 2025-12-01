import React from "react";
import { Input, Button, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { IAuthPayloadProps } from "../interface/interfaces";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { login, isLoadingLogin } = useAuth({
    onSuccess: () => {
      NotifAlert({ type: "success", message: "berhasil login" });
      localStorage.setItem("isLogin", "true");
      navigate("/");
    },

    onError: (type, err) => {
      NotifAlert({
        type: "error",
        message: err.message ?? `${type} error`,
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthPayloadProps>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: IAuthPayloadProps) => {
    login(data);
  };

  return (
    <div style={{ maxWidth: 350, margin: "0 auto", padding: "40px 0" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      {/* PENTING → gunakan form biasa */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <Form.Item
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username wajib diisi" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter username" />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password wajib diisi" }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter password" />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={isLoadingLogin}
          loading={isLoadingLogin}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
