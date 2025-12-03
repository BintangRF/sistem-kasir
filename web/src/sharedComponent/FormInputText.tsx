import { Input } from "antd";
import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface IFormInputTextProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>
> {
  name: K;
  defaultValue?: T[K];
  placeholder?: string;
  readonly?: boolean;
}

export function FormInputText<T extends FieldValues>({
  name,
  defaultValue,
  placeholder,
  readonly,
}: IFormInputTextProps<T>) {
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
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <div>
          <Input
            {...field}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            style={{ margin: "5px 0px" }}
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
