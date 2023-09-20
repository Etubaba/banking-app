"use client";

import { useModal } from "@/store";
import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import AmountModal from "./modal/AmountModal";

const TransferButton = () => {
  const handleAmountModal = useModal((state) => state.handleAmount);
  const setTypeAmount = useModal((state) => state.handleType);

  return (
    <div>
      <div
        onClick={() => {
          handleAmountModal(true);
          setTypeAmount("transfer");
        }}
        className="flex cursor-pointer hover:bg-orangehover flex-row items-center bg-orange text-white px-2 py-1 space-x-1 text-sm rounded-md"
      >
        <BiTransferAlt className="text-white" />
        <span className="text-white">Transfer</span>
      </div>
    </div>
  );
};

export default TransferButton;
