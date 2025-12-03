import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import {
  categoriesSchema,
  ICategoriesFormInputs,
  useCategories,
} from "../hooks/useCategories";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { FormButton } from "../sharedComponent/FormButton";
import { FormWrapper } from "../sharedComponent/FormWrapper";
import { FormInputText } from "../sharedComponent/FormInputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategoriesResponseProps } from "../interface/interfaces";

export const Category = () => {
  const {
    categoriesData,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    isLoadingCreate,
    isLoadingUpdate,
  } = useCategories({
    onSuccess: (res) =>
      NotifAlert({ type: "success", message: res?.message ?? "Success" }),

    onError: (err) =>
      NotifAlert({
        type: "error",
        message: err?.response?.data?.message ?? "Error",
      }),
  });

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: ICategoriesResponseProps, b: ICategoriesResponseProps) =>
        a.name.localeCompare(b.name),
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<ICategoriesResponseProps | null>(null);

  // Form setup
  const form = useForm<ICategoriesFormInputs>({
    resolver: zodResolver(categoriesSchema),
  });

  const handleAdd = () => {
    setSelectedCategory({ id: 0, name: "" });
  };

  const handleEdit = (category: ICategoriesResponseProps) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (values: ICategoriesFormInputs) => {
    const payload = { ...values, id: selectedCategory?.id ?? 0 };
    if (payload.id && payload.id !== 0) updateCategory(payload);
    else createCategory(values);

    setSelectedCategory(null);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h2>Categories Management</h2>

      <ReusableTable
        data={categoriesData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteCategory}
      />

      <Modal
        title={selectedCategory?.id !== 0 ? "Edit Category" : "Add Category"}
        open={!!selectedCategory}
        onCancel={() => setSelectedCategory(null)}
        footer={null}
      >
        <FormWrapper form={form} onSubmit={handleSubmit}>
          <FormInputText
            name="name"
            defaultValue={selectedCategory?.name}
            placeholder="Category name"
          />

          <FormButton
            loading={isLoadingCreate || isLoadingUpdate}
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            Submit
          </FormButton>
        </FormWrapper>
      </Modal>
    </div>
  );
};
