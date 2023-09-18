import { IconType } from "react-icons/lib/esm/iconBase";

export type detailsProps = {
  title: string;
  content: string;
  Icon: IconType;
  color?: string;
};
export type menu = {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  yes: boolean;
};

export type authProps = {
  signup?: boolean;
};

export type bottonProps = {
  text: string;
  onClick?: any;
  loading?: boolean;
  type?: string;
  disable?: boolean;
};

export interface IModal {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose: any;
}

export type ModalProps = {
  open: boolean;
  onClose: any;
  type?: string;
  user?: any;
};

export type userProps = {
  id: String;
  full_name: String;
  phone: String;
  email: String;
  account_balance: Number;
  transaction_history: any;
};
export type EmptyValueType = {
  name: String;
  title: String;
  Icon: IconType;
  style?: String;
};

export type RecordType = {
  id: string;
  amount: number;
  transaction_type: type;
  sender_id: null | string;
  sender_name: null | string;
  created_at: string;
  updated_at: string;
  beneficial_id: string;
};

export type SideNavType = {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};
enum type {
  credit = "credit",
  debit = "debit",
}
