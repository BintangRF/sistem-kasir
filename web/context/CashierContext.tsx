import React, { useState } from "react";

interface IItemProps {
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
  buyerName: string;
  setBuyerName: React.Dispatch<React.SetStateAction<string>>;
  amountReceived: string;
  setAmountReceived: React.Dispatch<React.SetStateAction<string>>;
  handleSelectItem: (item: IItemProps) => void;
  handleRemoveItem: (id: number) => void;
  handleShowModal: () => void;
  handleCloseModal: () => void;
  handlePaymentSuccess: () => void;
  totalAmount: number;
  itemsForPayment: { name: string; price: number; quantity: number }[];
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const CashierContext = React.createContext<ICashierContextProps | undefined>(
  undefined
);

export const CashierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<IItemProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
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
    if (existingItem && existingItem.quantity! > 1) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity! - 1 } : i
        )
      );
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== id));
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setBuyerName("");
    setAmountReceived("");
  };

  const handlePaymentSuccess = () => {
    setBuyerName("");
    setAmountReceived("");
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
        buyerName,
        setBuyerName,
        amountReceived,
        setAmountReceived,
        handleSelectItem,
        handleRemoveItem,
        handleShowModal,
        handleCloseModal,
        handlePaymentSuccess,
        totalAmount,
        itemsForPayment,
        formValues,
        setFormValues,
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
