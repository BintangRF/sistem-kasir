import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setToken: (token: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const hardcodedUsername = "admin";
  const hardcodedPassword = "password123";

  const handleFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;

    if (username === hardcodedUsername && password === hardcodedPassword) {
      const token = "your-token";
      localStorage.setItem("token", token);
      setToken(token);
      setSuccess(true);
      setError(null);
      navigate("/");
    } else {
      setError("Invalid username or password");
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto", padding: "50px 0" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username: admin" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password: password123" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message="Login successful!" type="success" />}
    </div>
  );
};

export default Login;
