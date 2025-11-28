import { useTransactions } from "../hooks/useTransactions";
import React from "react";
import { Modal } from "antd";
import { IFormField, ReusableForm } from "../sharedComponent/ReusableForm";
import { useCashier } from "../context/CashierContext";
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
  };

  const fields: IFormField[] = [
    { label: "Nama Pembeli", type: "text", name: "buyerName", required: true },

    {
      label: "Total Pembayaran",
      type: "number",
      name: "totalAmount",
      readOnly: true,
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
      readOnly: true,
      computeValue: (values) =>
        Math.max(
          0,
          Number(values.amountReceived || 0) - Number(values.totalAmount || 0)
        ),
    },
  ];

  const { handleCashTransaction, isLoading, errorState } = useTransactions();

  const handleOnChange = (updatedValues: any) => {
    const newValues = { ...formValues, ...updatedValues };
    setFormValues(newValues);
  };

  const handleSubmit = async () => {
    const transaction = {
      ...initialValues,
      amountReceived: initialValues.amountReceived,
      items: selectedItems,
      transactionDate: new Date(),
    };

    handleCashTransaction(transaction, {
      onSuccess: () => {
        handlePaymentSuccess();
      },
    });
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
