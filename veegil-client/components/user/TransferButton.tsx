"use client";

import { useModal } from "@/store";
import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import AmountModal from "./modal/AmountModal";

const TransferButton = () => {
  const handleAmountModal = useModal((state) => state.handleAmount);
  const amountModal = useModal((state) => state.amountModal);

  return (
    <div>
      <div
        onClick={() => {
          handleAmountModal(true);
        }}
        className="flex cursor-pointer hover:bg-orangehover flex-row items-center bg-orange text-white px-2 py-1 space-x-1 text-sm rounded-md"
      >
        <BiTransferAlt className="text-white" />
        <span className="text-white">Transfer</span>
      </div>

      <AmountModal
        type={"transfer"}
        open={amountModal}
        onClose={() => handleAmountModal(false)}
      />
    </div>
  );
};

export default TransferButton;
