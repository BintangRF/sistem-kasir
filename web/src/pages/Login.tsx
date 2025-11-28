import React from "react";
import { Input, Button, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { IAuthProps, useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { authLogin, isPending } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthProps>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: IAuthProps) => {
    authLogin(data);
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

        <Button type="primary" htmlType="submit" block loading={isPending}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
