"use client";
import Modal from "@/components/common/Modal";
import { ModalProps } from "@/interface";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import React from "react";
import { useModal } from "@/store";

const SuccessModal = ({ open, onClose, type }: ModalProps) => {
  const errorMsg = useModal((state) => state.errorMsg);
  return (
    <Modal onClose={onClose} open={open}>
      <div className=" w-[20rem] md:w-[24rem]  h-auto">
        <div className="flex flex-col space-y-3 justify-center items-center">
          {type === "success" ? (
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
          ) : (
            <MdErrorOutline className="text-red-600 text-5xl" />
          )}
          <p className="text-lg font-semibold mt-2">
            {type === "success" ? "Transaction Completed" : "Error"}
          </p>
          <p className="text-sm text-center text-textColor mt-2">
            {type === "success"
              ? " You have completed your transaction successfully."
              : errorMsg}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
