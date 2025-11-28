// CashierContext.tsx
import React, { useState } from "react";

export interface IItemProps {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface ICashierContextProps {
  selectedItems: IItemProps[];
  setSelectedItems: React.Dispatch<React.SetStateAction<IItemProps[]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  formValues: {
    buyerName: string;
    amountReceived: number;
    [k: string]: any;
  };
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  handleSelectItem: (item: IItemProps) => void;
  handleRemoveItem: (id: number) => void;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  handlePaymentSuccess: () => void;
  totalAmount: number;
  itemsForPayment: { name: string; price: number; quantity: number }[];
}

const CashierContext = React.createContext<ICashierContextProps | undefined>(
  undefined
);

export const CashierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<IItemProps[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formValues, setFormValues] = useState<any>({
    buyerName: "",
    amountReceived: "",
  });

  const handleSelectItem = (item: IItemProps) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (id: number) => {
    const existingItem = selectedItems.find((item) => item.id === id);
    if (existingItem && (existingItem.quantity || 0) > 1) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, quantity: (i.quantity || 0) - 1 } : i
        )
      );
    } else {
      setSelectedItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleShowModal = () => setShowModal(true);

  const resetFormValues = () =>
    setFormValues({
      buyerName: "",
      amountReceived: "",
    });

  const handleCloseModal = () => {
    setShowModal(false);
    resetFormValues();
  };

  const handlePaymentSuccess = () => {
    setSelectedItems([]);
    handleCloseModal();
  };

  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );

  const itemsForPayment = selectedItems.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity || 0,
  }));

  return (
    <CashierContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        showModal,
        setShowModal,
        formValues,
        setFormValues,
        handleSelectItem,
        handleRemoveItem,
        handleShowModal,
        handleCloseModal,
        handlePaymentSuccess,
        totalAmount,
        itemsForPayment,
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
