// CashierContext.tsx
import React, { useState } from "react";
import { ICashierItemList } from "../hooks/useTransactions";
import { NotifAlert } from "../sharedComponent/NotifAlert";

interface ICashierContextProps {
  selectedItems: ICashierItemList[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ICashierItemList[]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectItem: (item: ICashierItemList) => void;
  handleRemoveItem: (id: number) => void;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  handlePaymentSuccess: () => void;
  clearSelectedItems: () => void;
  totalAmount: number;
}

const CashierContext = React.createContext<ICashierContextProps | undefined>(
  undefined
);

export const CashierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<ICashierItemList[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelectItem = (item: ICashierItemList) => {
    const clean = {
      id: item.id,
      name: item.name,
      price: item.price,
    };

    setSelectedItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === clean.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === clean.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
        );
      }
      return [...prevItems, { ...clean, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing && (existing.quantity || 0) > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: (i.quantity || 0) - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleShowModal = () => {
    if (selectedItems.length === 0) {
      NotifAlert({ type: "warning", message: "Pilih item terlebih dahulu" });
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePaymentSuccess = () => {
    handleCloseModal();
  };

  const clearSelectedItems = () => setSelectedItems([]);

  const totalAmount = selectedItems.reduce(
    (t, i) => t + i.price * (i.quantity || 0),
    0
  );

  return (
    <CashierContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        showModal,
        setShowModal,
        handleSelectItem,
        handleRemoveItem,
        handleShowModal,
        handleCloseModal,
        handlePaymentSuccess,
        clearSelectedItems,
        totalAmount,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
};

export const useCashier = () => {
  const context = React.useContext(CashierContext);
  if (!context) {
    throw new Error("useCashier must be used within a CashierProvider");
  }
  return context;
};
