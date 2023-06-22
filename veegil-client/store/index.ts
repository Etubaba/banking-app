import { userProps } from "@/interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const authStore = (set: any) => ({
  isLoggedIn: false,
  handleAuth: (truth: boolean) => {
    // Your authentication logic here
    set({ isLoggedIn: truth });
  },
});
const modalStore = (set: any) => ({
  amountModal: false,
  successModal: false,
  responseType: "success",
  errorMsg: "",
  paymentUrl: "",
  paymentModal: false,
  handleErrorMsg: (load: string) => {
    set({ errorMsg: load });
  },
  setUrl: (load: string) => {
    set({ paymentUrl: load });
  },
  handleAmount: (truth: boolean) => {
    set({ amountModal: truth });
  },
  handlePayment: (truth: boolean) => {
    set({ paymentModal: truth });
  },
  handleSuccess: (truth: boolean) => {
    set({ successModal: truth });
  },
  handleMessage: (load: string) => {
    set({ responseType: load });
  },
});

const store = (set: any) => ({
  user: null,
  authenticateUser: (user: userProps) => {
    // Your authentication logic here
    set({ user });
  },
});

export const useStore = create(
  persist(devtools(store), {
    name: "_u382qh",
  })
);

export const useAuthStore = create(
  persist(devtools(authStore), {
    name: "_is3wrs",
  })
);
export const useModal = create(devtools(modalStore));
