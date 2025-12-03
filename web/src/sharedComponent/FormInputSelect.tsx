import { Select } from "antd";
import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface IFormInputSelectProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>
> {
  name: K;
  options: { label: string; value: string | number }[];
  defaultValue?: T[K];
  placeholder?: string;
}

export function FormInputSelect<T extends FieldValues>({
  name,
  options,
  defaultValue,
  placeholder,
}: IFormInputSelectProps<T>) {
  const { control, setValue } = useFormContext<T>();

  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div style={{ margin: "10px 0" }}>
          <Select
            {...field}
            value={field.value ?? undefined}
            placeholder={placeholder}
            options={options}
            style={{ width: "100%" }}
            onChange={(val) => field.onChange(val)}
          />
          {fieldState.error?.message && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
