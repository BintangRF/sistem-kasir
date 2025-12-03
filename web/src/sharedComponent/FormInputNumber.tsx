import { Input } from "antd";
import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface IFormInputNumberProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>
> {
  name: K;
  defaultValue?: T[K];
  placeholder?: string;
  readonly?: boolean;
}

export function FormInputNumber<T extends FieldValues>({
  name,
  defaultValue,
  placeholder,
  readonly,
}: IFormInputNumberProps<T>) {
  const { control, setValue } = useFormContext<T>();

  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const format = (value: string | number) => {
    if (value === null || value === undefined || value === "") return "";
    return new Intl.NumberFormat("id-ID").format(Number(value));
  };

  const unformat = (value: string) => {
    if (!value) return "";
    return Number(value.replace(/\./g, ""));
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div style={{ margin: "5px 0" }}>
          <Input
            placeholder={placeholder}
            value={format(field.value)}
            onChange={(e) => {
              const raw = unformat(e.target.value);
              field.onChange(raw);
            }}
            readOnly={readonly}
          />
          {fieldState.error?.message && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
