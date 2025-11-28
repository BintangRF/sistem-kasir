import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { useCategories } from "../hooks/useCategories";

interface ICategoryDataProps {
  name: string;
}

export const Category = () => {
  const {
    categoriesData,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  useEffect(() => {
    getCategories();
  }, []);

  // List Columns
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a: ICategoryDataProps, b: ICategoryDataProps) =>
        a.name.localeCompare(b.name),
    },
  ];

  const dataSource: ICategoryDataProps[] = Object.values(categoriesData);

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
        />
      </Modal>
    </div>
  );
};
