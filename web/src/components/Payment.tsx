import { useTransactions } from "../hooks/useTransactions";
import React from "react";
import { Modal, Button } from "antd";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { useCashier } from "../../context/CashierContext";

export const Payment: React.FC = () => {
  const {
    showModal,
    handleCloseModal,
    handlePaymentSuccess,
    selectedItems,
    totalAmount,
    itemsForPayment,
    formValues,
    setFormValues,
  } = useCashier();

  const initialValues = {
    ...formValues,
    items: itemsForPayment,
    totalAmount: totalAmount,
    change: Math.max(0, Number(formValues.amountReceived) - totalAmount),
  };

  const fields: IFormField[] = [
    { label: "Nama Pembeli", type: "text", name: "buyerName", required: true },
    {
      label: "Total Pembayaran",
      type: "number",
      name: "totalAmount",
      value: initialValues.totalAmount,
      disabled: true,
    },
    {
      label: "Jumlah Uang Diterima",
      type: "number",
      name: "amountReceived",
      required: true,
    },
    {
      label: "Kembalian",
      type: "number",
      name: "change",
      value: initialValues.change,
      disabled: true,
    },
  ];

  const { handleCashTransaction, isLoading, errorState } = useTransactions();

  const handleOnChange = (updatedValues: any) => {
    const newValues = { ...formValues, ...updatedValues };

    setFormValues(newValues);
  };

  const validateForm = () => {
    for (const field of fields) {
      if (
        field.required &&
        !initialValues[field.name as keyof typeof initialValues]
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const transaction = {
      ...initialValues,
      amountReceived: initialValues.amountReceived,
      change: initialValues.change,
      items: selectedItems,
      transactionDate: new Date(),
    };

    await handleCashTransaction(transaction, () => handlePaymentSuccess());
  };

  return (
    <Modal
      open={showModal}
      title="Payment Form"
      onCancel={handleCloseModal}
      centered
      footer={null}
    >
      {isLoading && <p>Loading...</p>}
      {errorState && <p>Error: {errorState}</p>}
      <ReusableForm
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onChange={handleOnChange}
      />
    </Modal>
  );
};
