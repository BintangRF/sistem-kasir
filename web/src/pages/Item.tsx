import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useItem } from "../hooks/useItems";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { formatNumber } from "../utils/formatNumber";
import { useCategories } from "../hooks/useCategories";

interface IProductDataProps {
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
}

export const Item = () => {
  const { itemsData, getItems, createItem, updateItem, deleteItem, isLoading } =
    useItem();
  const {
    categoriesData,
    getCategories,
    isLoading: isLoadingCategories,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  // List Columns
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: IProductDataProps, b: IProductDataProps) =>
        a.name.localeCompare(b.name),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (price: number) => formatNumber(price) + " IDR",
      sorter: (a: IProductDataProps, b: IProductDataProps) => a.price - b.price,
    },
    {
      key: "categoryId",
      title: "Category",
      dataIndex: "category",
      render: (category: { name: string }) => category.name,
    },
  ];

  const dataSource: IProductDataProps[] = Object.values(itemsData);

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
        />
      </Modal>
    </div>
  );
};
