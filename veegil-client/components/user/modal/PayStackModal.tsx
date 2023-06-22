"use client";
import Modal from "@/components/common/Modal";
import { ModalProps } from "@/interface";
import { useModal } from "@/store";
import React from "react";

const PayStackModal = ({ onClose, open }: ModalProps) => {
  const url = useModal((state) => state.paymentUrl);
  return (
    <Modal title={"Make Payment"} onClose={onClose} open={open}>
      <iframe
        id="payment"
        src={url}
        className=" md:w-[28rem]  h-[400px]"
      ></iframe>
    </Modal>
  );
};

export default PayStackModal;
