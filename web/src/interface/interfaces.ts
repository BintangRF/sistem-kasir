export interface ApiResponse<T> {
  data?: T;
  message?: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IItemResponseProps {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
}

export interface ICategoriesResponseProps {
  id: number;
  name: string;
}

export interface IProfileResponseProps {
  id: number;
  username: string;
}

export interface IItemTransactionsProps {
  id: number;
  name: string;
  quantity: number;
}

export interface ITransactionResponseProps {
  buyerName: string;
  totalAmount: number;
  amountReceived: number;
  transactionDate: Date;
  items: IItemTransactionsProps[];
}
