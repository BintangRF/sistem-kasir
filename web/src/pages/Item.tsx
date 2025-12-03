import React, { useState } from "react";
import { Modal } from "antd";
import { IItemsFormInputs, itemsSchema, useItems } from "../hooks/useItems";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { formatNumber } from "../utils/formatNumber";
import { useCategories } from "../hooks/useCategories";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { FormWrapper } from "../sharedComponent/FormWrapper";
import { FormInputText } from "../sharedComponent/FormInputText";
import { FormInputSelect } from "../sharedComponent/FormInputSelect";
import { FormButton } from "../sharedComponent/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IItemResponseProps } from "../interface/interfaces";
import { FormInputNumber } from "../sharedComponent/FormInputNumber";

export const Item = () => {
  const {
    itemsData,
    createItem,
    updateItem,
    deleteItem,
    isLoading,
    isLoadingCreate,
    isLoadingUpdate,
  } = useItems({
    onSuccess: (res) => {
      NotifAlert({ type: "success", message: res?.message ?? "Success" });
    },

    onError: (err) => {
      console.error(err);
      const msg = err?.response?.data?.message ?? "Error";

      NotifAlert({
        type: "error",
        message: msg,
      });
    },
  });

  const { categoriesData, isLoading: isLoadingCategories } = useCategories();

  const [selectedItem, setSelectedItem] = useState<IItemResponseProps | null>(
    null
  );

  // List Columns
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: IItemResponseProps, b: IItemResponseProps) =>
        a.name.localeCompare(b.name),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (price: number) => formatNumber(price) + " IDR",
      sorter: (a: IItemResponseProps, b: IItemResponseProps) =>
        a.price - b.price,
    },
    {
      key: "categoryId",
      title: "Category",
      dataIndex: "category",
      render: (category: { name: string }) => category.name,
    },
  ];

  const categoriesOptions = Object.values(categoriesData).map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const form = useForm<IItemsFormInputs>({
    resolver: zodResolver(itemsSchema),
  });

  const handleAdd = () => {
    setSelectedItem({
      id: 0,
      name: "",
      price: 0,
      categoryId: 0,
      category: { name: "" },
    });
  };

  const handleEdit = (item: IItemResponseProps) => {
    setSelectedItem(item);
  };

  const handleSubmit = (values: IItemsFormInputs) => {
    const payload = { ...values, id: selectedItem?.id ?? 0 };
    if (payload.id && payload.id !== 0) updateItem(payload);
    else createItem(payload);

    setSelectedItem(null);
  };

  return (
    <div>
      {isLoading && isLoadingCategories && <p>Loading...</p>}
      <h2>Items Management</h2>

      <ReusableTable
        data={itemsData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteItem}
      />

      <Modal
        title={selectedItem?.id ? "Edit Item" : "Add Item"}
        open={!!selectedItem}
        onCancel={() => setSelectedItem(null)}
        footer={null}
      >
        <FormWrapper form={form} onSubmit={handleSubmit}>
          <FormInputText
            name="name"
            defaultValue={selectedItem?.name}
            placeholder="Item name"
          />
          <FormInputNumber
            defaultValue={selectedItem?.price}
            name="price"
            placeholder="Price"
          />

          <FormInputSelect
            name="categoryId"
            defaultValue={selectedItem?.categoryId}
            placeholder="Select category"
            options={categoriesOptions}
          />

          <FormButton
            disabled={isLoadingCreate || isLoadingUpdate}
            loading={isLoadingCreate || isLoadingUpdate}
          >
            Submit
          </FormButton>
        </FormWrapper>
      </Modal>
    </div>
  );
};
