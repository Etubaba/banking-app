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
  primary?: boolean;
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
  id: string;
  full_name: string;
  phone: string;
  email: string;
  account_balance: number;
  transaction_history: any;
  avatar: string;
  created_at?: string;
  role: string[];
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

export type InputProps = {
  type?: string;
  placeholder?: string;
  style?: string;
  value?: string;
  disable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export type BillProps = {
  Icon: IconType;
  id: number;
  name: string;
};

type List = {
  image: string;
  name: string;
};

export type selectType = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  list: List[];
  // style?: string;
  position?: string;
};

export type dasboardCompo = {
  title: string;
  Icon: IconType;
  value: string | number;
  color?: string;
  link?: string;
};

export type searchInputType = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
