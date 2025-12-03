import {
  ITransactionsFormInputs,
  transactionsSchema,
  useTransactions,
} from "../hooks/useTransactions";
import React, { useEffect } from "react";
import { Modal } from "antd";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { FormWrapper } from "../sharedComponent/FormWrapper";
import { FormInputText } from "../sharedComponent/FormInputText";
import { FormInputNumber } from "../sharedComponent/FormInputNumber";
import { useForm } from "react-hook-form";
import { FormButton } from "../sharedComponent/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCashier } from "../context/CashierContext";

export const Payment: React.FC = () => {
  const {
    showModal,
    handleCloseModal,
    handlePaymentSuccess,
    selectedItems,
    totalAmount,
    clearSelectedItems,
  } = useCashier();

  const { createTransaction, isLoadingMutate } = useTransactions({
    onSuccess: (res) => {
      clearSelectedItems();
      handlePaymentSuccess();
      NotifAlert({
        type: "success",
        message: res?.message ?? "Success",
      });
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

  const form = useForm<ITransactionsFormInputs>({
    resolver: zodResolver(transactionsSchema),
  });

  // Calculate change
  useEffect(() => {
    const sub = form.watch((v) => {
      const change = Number(v.amountReceived || 0) - Number(v.totalAmount || 0);
      const safe = change > 0 ? change : 0;

      if (safe !== form.getValues("change")) {
        form.setValue("change", safe, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
      }
    });
    return () => sub.unsubscribe();
  }, [form, selectedItems]);

  const handleSubmit = (values: ITransactionsFormInputs) => {
    const payload = {
      ...values,
      items: selectedItems,
      transactionDate: new Date(),
    };

    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
      NotifAlert({ type: "error", message: "Tidak ada item yang dipilih." });
      return;
    }

    createTransaction(payload);
  };

  return (
    <Modal
      title="Create Transaction"
      open={showModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      <FormWrapper form={form} onSubmit={handleSubmit}>
        <FormInputText
          name="buyerName"
          defaultValue=""
          placeholder="Nama Pembeli"
        />

        <FormInputNumber
          name="totalAmount"
          defaultValue={totalAmount}
          placeholder="Total Pembayaran"
          readonly
        />

        <FormInputNumber
          name="amountReceived"
          defaultValue={0}
          placeholder="Jumlah Uang Diterima"
        />

        <FormInputNumber
          name="change"
          defaultValue={0}
          placeholder="Kembalian"
          readonly
        />

        <FormButton loading={isLoadingMutate}>Pay</FormButton>
      </FormWrapper>
    </Modal>
  );
};
