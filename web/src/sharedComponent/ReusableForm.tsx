import React, { useEffect } from "react";
import { Form, Input, InputNumber, Select, Checkbox, Button } from "antd";
import { formatNumber } from "../utils/formatNumber";

export interface IFormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "password" | "date";
  options?: { label: string; value: string | number }[];
  value?: any;
  required?: boolean;
  disabled?: boolean;
}

interface ReusableFormProps {
  fields: IFormField[];
  initialValues?: any;
  onSubmit?: (values: any) => void;
  onChange?: (updatedValues: any) => void;
  submitButton?: boolean;
  layout?: "horizontal" | "vertical" | "inline";
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  onChange,
  submitButton = true,
  layout = "vertical",
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleValuesChange = (allValues: any) => {
    if (onChange) {
      onChange(allValues);
    }
  };

  const renderField = (field: IFormField) => {
    const { name, label, type, options, required, disabled } = field;

    switch (type) {
      case "text":
        return (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required, message: `${label} is required` }]}
          >
            <Input disabled={disabled} />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required, message: `${label} is required` }]}
          >
            <InputNumber
              disabled={disabled}
              style={{ width: "100%" }}
              formatter={(value) => formatNumber(Number(value))}
              parser={(value) => (value ? value.replace(/\D/g, "") : "")}
            />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required, message: `${label} is required` }]}
          >
            <Select disabled={disabled}>
              {options?.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item key={name} name={name} valuePropName="checked">
            <Checkbox disabled={disabled}>{label}</Checkbox>
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required, message: `${label} is required` }]}
          >
            <Input.Password disabled={disabled} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
      layout={layout}
    >
      {fields.map((field) => renderField(field))}

      {submitButton && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
