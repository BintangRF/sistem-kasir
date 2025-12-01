import React, { useState } from "react";
import { Modal } from "antd";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { useCategories } from "../hooks/useCategories";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { ICategoryTableProps } from "../interface/interfaces";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  // List Columns
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: ICategoryTableProps, b: ICategoryTableProps) =>
        a.name.localeCompare(b.name),
    },
  ];

  const dataSource: ICategoryTableProps[] = Object.values(categoriesData);

  // form CRUD
  const fields: IFormField[] = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      required: true,
    },
  ];

  const handleSubmit = (values: any) => {
    if (editingCategory) {
      updateCategory({ ...editingCategory, ...values });
    } else {
      createCategory(values);
    }

    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h2>Categories Management</h2>

      <ReusableTable
        data={dataSource}
        columns={columns}
        onAdd={() => setIsModalOpen(true)}
        onEdit={handleEdit}
        onDelete={deleteCategory}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <ReusableForm
          key={editingCategory ? editingCategory.id : "new"}
          fields={fields}
          initialValues={editingCategory}
          onSubmit={handleSubmit}
          isLoading={isLoadingCreate || isLoadingUpdate}
        />
      </Modal>
    </div>
  );
};
