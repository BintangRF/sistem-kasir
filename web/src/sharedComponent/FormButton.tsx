import { Button, ButtonProps } from "antd";

interface IFormButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function FormButton({ children, ...rest }: IFormButtonProps) {
  return (
    <Button type="primary" htmlType="submit" block {...rest}>
      {children}
    </Button>
  );
}
