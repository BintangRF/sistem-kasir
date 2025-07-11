// NotificationAlert.tsx
import React from "react";
import { notification } from "antd";

interface NotificationAlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  description?: string;
}

export const NotifAlert = ({
  type,
  message,
  description,
}: NotificationAlertProps) => {
  notification[type]({
    message,
    description,
  });
};
