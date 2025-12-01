export interface IItemTableProps {
  id: string;
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
}

export interface IItemPayloadProps {
  id: string;
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
}

export interface ICashierItemListProps {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface IAuthPayloadProps {
  username: string;
  password: string;
}

export interface IProfileResponseProps {
  id: number;
  username: string;
}

export interface ICategoryPayloadProps {
  id: string;
  name: string;
}

export interface ICategoryTableProps {
  id: string;
  name: string;
}

export interface IItemTransactionTableProps {
  name: string;
  quantity: number;
  id: string;
}

export interface ITransactionTableProps {
  buyerName: string;
  totalAmount: number;
  transactionDate: Date;
  items: IItemTransactionTableProps[];
}

export interface ITransactionPayloadProps {
  buyerName: string;
  amountReceived: number;
  items: Array<any>;
  totalAmount: number;
  transactionDate: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
