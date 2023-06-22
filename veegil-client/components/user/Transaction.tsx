"use client";
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { useModal } from "@/store";
import AmountModal from "./modal/AmountModal";
import SuccessModal from "./modal/SuccessModal";
import PayStackModal from "./modal/PayStackModal";
import { usePathname, useRouter } from "next/navigation";

const Transaction = () => {
  const [typeAmount, setTypeAmount] = useState("withdraw");
  const amountModal = useModal((state) => state.amountModal);
  const successModal = useModal((state) => state.successModal);
  const handlePayment = useModal((state) => state.handlePayment);
  const paymentModal = useModal((state) => state.paymentModal);
  const responseType = useModal((state) => state.responseType);
  const handleAmountModal = useModal((state) => state.handleAmount);
  const handleSuccessModal = useModal((state) => state.handleSuccess);
  const path = usePathname();
  const router = useRouter();

  function refreshServer() {
    return router.replace(path);
  }

  return (
    <div className="flex space-x-2">
      <div
        onClick={() => {
          setTypeAmount("fund");
          handleAmountModal(true);
        }}
        className="flex cursor-pointer space-x-1 px-2 hover:bg-white/20  py-1 bg-white rounded-md shadow items-center"
      >
        <MdAddCircle className="text-xl text-primary" />
        <p className="text-primary text-sm">Add Money</p>
      </div>
      <div
        onClick={() => {
          setTypeAmount("withdraw");
          handleAmountModal(true);
        }}
        className="flex cursor-pointer hover:bg-orangehover flex-row items-center bg-orange text-white px-2 py-1 space-x-1 text-sm rounded-md"
      >
        <HiOutlineCash className="text-white" />
        <span className="text-white">Withdraw</span>
      </div>

      <AmountModal
        type={typeAmount}
        open={amountModal}
        onClose={() => handleAmountModal(false)}
      />

      <PayStackModal
        open={paymentModal}
        onClose={() => {
          handlePayment(false);
          refreshServer();
        }}
      />

      <SuccessModal
        type={responseType}
        open={successModal}
        onClose={() => handleSuccessModal(false)}
      />
    </div>
  );
};

export default Transaction;
