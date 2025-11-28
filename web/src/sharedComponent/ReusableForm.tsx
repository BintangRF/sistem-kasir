import React, { useEffect, useRef } from "react";
import { Input, InputNumber, Select, Checkbox, Button } from "antd";
import { formatNumber } from "../utils/formatNumber";
import { Controller, useForm } from "react-hook-form";

export interface IFormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "password" | "date";
  options?: { label: string; value: string | number }[];
  value?: any;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  computeValue?: (formValues: any) => any;
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
}) => {
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: initialValues,
  });

  const values = watch();

  useEffect(() => {
    fields.forEach((field) => {
      if (field.computeValue) {
        const computed = field.computeValue(values);
        setValue(field.name, computed, { shouldValidate: true });
      }
    });

    if (onChange) onChange(values);
  }, [values]);

  const renderField = (field: IFormField) => {
    const { name, label, type, required, options, disabled, readOnly } = field;
    const rules = required ? { required: `${label} is required` } : undefined;

    switch (type) {
      case "text":
      case "password":
        return (
          <div key={name} style={{ marginBottom: 16 }}>
            <label>{label}</label>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field, fieldState }) => (
                <>
                  {type === "text" && (
                    <Input {...field} disabled={disabled} readOnly={readOnly} />
                  )}
                  {type === "password" && (
                    <Input.Password
                      {...field}
                      disabled={disabled}
                      readOnly={readOnly}
                    />
                  )}
                  {fieldState.error && (
                    <small style={{ color: "red" }}>
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        );

      case "number":
        return (
          <div key={name} style={{ marginBottom: 16 }}>
            <label>{label}</label>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field, fieldState }) => (
                <>
                  <InputNumber
                    {...field}
                    disabled={disabled}
                    style={{ width: "100%" }}
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    formatter={(value) =>
                      formatNumber(Number(value === undefined ? "" : value))
                    }
                    parser={(v) => (v ? String(v).replace(/\D/g, "") : "")}
                    readOnly={readOnly}
                  />
                  {fieldState.error && (
                    <small style={{ color: "red" }}>
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        );

      case "select":
        return (
          <div key={name} style={{ marginBottom: 16 }}>
            <label>{label}</label>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    disabled={disabled}
                    style={{ width: "100%" }}
                    onChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    {options?.map((opt) => (
                      <Select.Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Select.Option>
                    ))}
                  </Select>

                  {fieldState.error && (
                    <small style={{ color: "red" }}>
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={name} style={{ marginBottom: 16 }}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  disabled={disabled}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  {label}
                </Checkbox>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit || (() => {}))}>
      {fields.map((field) => renderField(field))}

      {submitButton && (
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      )}
    </form>
  );
};
