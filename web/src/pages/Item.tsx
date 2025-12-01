import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useItems } from "../hooks/useItems";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { formatNumber } from "../utils/formatNumber";
import { useCategories } from "../hooks/useCategories";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { IItemTableProps } from "../interface/interfaces";

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
    onSuccess: (type) => {
      const msg = {
        create: "data berhasil ditambahkan",
        update: "perbaruan data berhasil",
        delete: "data berhasil dihapus",
      }[type];

      NotifAlert({ type: "success", message: msg });
    },

    onError: (type, err) => {
      NotifAlert({
        type: "error",
        message: err.message ?? `${type} error`,
      });
    },
  });

  const { categoriesData, isLoading: isLoadingCategories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // List Columns
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: IItemTableProps, b: IItemTableProps) =>
        a.name.localeCompare(b.name),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (price: number) => formatNumber(price) + " IDR",
      sorter: (a: IItemTableProps, b: IItemTableProps) => a.price - b.price,
    },
    {
      key: "categoryId",
      title: "Category",
      dataIndex: "category",
      render: (category: { name: string }) => category.name,
    },
  ];

  const dataSource: IItemTableProps[] = Object.values(itemsData) || [];

  // Form CRUD
  const fields: IFormField[] = [
    {
      name: "name",
      label: "Item Name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      required: true,
      options: Object.values(categoriesData).map((cat: any) => ({
        label: cat.name,
        value: cat.id,
      })),
    },
  ];

  const handleSubmit = (values: any) => {
    if (editingItem) {
      updateItem({ ...editingItem, ...values });
    } else {
      createItem(values);
    }

    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading && isLoadingCategories && <p>Loading...</p>}
      <h2>Items Management</h2>

      <ReusableTable
        data={dataSource}
        columns={columns}
        onAdd={() => setIsModalOpen(true)}
        onEdit={handleEdit}
        onDelete={deleteItem}
      />

      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <ReusableForm
          key={editingItem ? editingItem.id : "new"}
          fields={fields}
          initialValues={editingItem}
          onSubmit={handleSubmit}
          isLoading={isLoadingCreate || isLoadingUpdate}
        />
      </Modal>
    </div>
  );
};
