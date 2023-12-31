"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { usePathname, useRouter } from "next/navigation";
import { ModalProps, userProps } from "@/interface";
import { BASE_URL } from "@/constant";

import axios from "axios";
import { useModal, useStore } from "@/store";
import { getCookie } from "cookies-next";
import {} from "zustand";
import { validateToken } from "@/helper/validateToken";

const AmountModal = ({ open, onClose, type }: ModalProps) => {
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const successModal = useModal((state) => state.handleSuccess);
  const amountModal = useModal((state) => state.handleAmount);
  const responseType = useModal((state) => state.handleMessage);

  const errorMsg = useModal((state) => state.handleErrorMsg);
  const setUrl = useModal((state) => state.setUrl);
  const handlePayment = useModal((state) => state.handlePayment);
  const user: any = useStore((state) => state.user);
  const path = usePathname();
  const router = useRouter();

  function refreshServer() {
    return router.replace(path);
  }

  const withdrawFunds = async () => {
    if (user.account_balance < +amount) {
      errorMsg("Insufficient Fund to complete this transaction.");
      responseType("error");
      amountModal(false);
      successModal(true);
      return;
    }
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.post(`${BASE_URL}transaction/withdraw`, {
        amount: +amount,
      });

      if (data) {
        refreshServer();
        amountModal(false);
        successModal(true);
        responseType("success");
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      successModal(true);
      responseType("error");
      if (err.response) {
        errorMsg(err.response.data.message);
      } else errorMsg(err.message);
    }
  };

  const addFunds = async () => {
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}transaction/payment`, {
        amount: +amount,
      });

      if (data) {
        amountModal(false);
        setLoading(false);
        setUrl(data.data.authorization_url);
        handlePayment(true);
      }
    } catch (err: any) {
      setLoading(false);
      responseType("error");
      if (err.response) {
        errorMsg(err.response.data.message);
      } else errorMsg(err.message);
    }
  };

  const transferMoney = async () => {
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}transaction/transfer`, {
        amount: +amount,
        target_acct: destination,
      });

      if (data) {
        refreshServer();
        amountModal(false);
        successModal(true);
        responseType("success");
        setLoading(false);
      }
    } catch (err: any) {
      responseType("error");
      if (err.response) {
        errorMsg(err.response.data.message);
      } else errorMsg(err.message);
    }
  };

  const validateUser = async () => {
    setLoading(true);
    try {
      const formdata = {
        password,
        phone: user.phone,
      };
      const { data: resData } = await axios.post(
        `${BASE_URL}auth/login`,
        formdata
      );

      if (resData) {
        if (type == "withdraw") {
          withdrawFunds();
        } else if (type == "fund") {
          addFunds();
        } else if (type === "transfer") {
          transferMoney();
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrMsg(err.response.data.message);
      errorMsg(err.response.data.message);
    }
  };

  const disable =
    type !== "transfer"
      ? amount === "" || password === ""
        ? true
        : false
      : amount === "" || password === "" || destination === ""
      ? true
      : false;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="md:w-[24rem]  h-auto">
        <p className=" text-center font-semibold md:text-left ">
          {type == "withdraw"
            ? "Withraw Fund"
            : type === "fund"
            ? "Add Fund"
            : "Transfer"}
        </p>
        <div className="border-b my-4" />
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-textColor">Enter Amount</p>

          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
          />
        </div>

        {type === "transfer" && (
          <div className="flex flex-col space-y-4 mt-2">
            <p className="text-sm text-textColor">Destination Account</p>
            <input
              onChange={(e) => setDestination(e.target.value)}
              type="number"
              className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
            />
          </div>
        )}

        <div className="flex flex-col space-y-4 mt-2">
          <p className="text-sm text-textColor">Enter Pin</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
          />
        </div>
        <div className="flex justify-between  mt-4">
          <button
            onClick={onClose}
            className="bg-white border hover:bg-slate-50 px-5 py-1.5 rounded-md text-sm font-semibold text-textColor mr-2"
          >
            Cancel
          </button>
          <Button
            disable={disable}
            loading={loading}
            type="custom"
            onClick={validateUser}
            text={
              type === "withdraw"
                ? "Withdraw"
                : type === "fund"
                ? "Add Fund"
                : "Transfer"
            }
          />
        </div>
        {errMsg !== "" && <p className="text-red-700 my-2">{errMsg}</p>}
      </div>
    </Modal>
  );
};

export default AmountModal;
