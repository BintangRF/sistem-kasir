import { Input } from "antd";
import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface IFormInputPasswordProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>
> {
  name: K;
  defaultValue?: T[K];
  placeholder?: string;
}

export function FormInputPassword<T extends FieldValues>({
  name,
  defaultValue,
  placeholder,
}: IFormInputPasswordProps<T>) {
  const { control, setValue } = useFormContext<T>();

  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div style={{ margin: "5px 0" }}>
          <Input.Password
            {...field}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {fieldState.error?.message && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
