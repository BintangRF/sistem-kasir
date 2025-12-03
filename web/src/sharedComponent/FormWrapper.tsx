import { FormProvider, UseFormReturn, DefaultValues } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import React, { useEffect } from "react";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  children,
  defaultValues,
}: FormWrapperProps<T>) {
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
