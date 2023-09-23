"use client";
import { Modal } from "@/components";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { Bills } from "@/components/user/bill/Bills";
import { BASE_URL } from "@/constant";
import {
  DSTVPackage,
  ElectricityProvider,
  TvProvider,
  airtimeProvider,
  bills,
  charityOrg,
  gotvPackages,
} from "@/constant/mock";
import { userProps } from "@/interface";
import { useStore } from "@/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const page = () => {
  const [billType, setBillType] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("Select Provider");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const [UserCreditId, setUserCreditId] = useState(""); // this can be phone, dstv id code , and so on

  const [tvPackage, setTvPackage] = useState("Subscription Type"); // for tv sub

  const [success, setSuccess] = useState(false);

  const [reload, setReload] = useState(0);

  const [amountPlaceholder, setAmountPlaceholder] = useState<string>("Amount");

  const [errMsg, setErrMsg] = useState("");
  const token = getCookie("_er3434");

  const handleBillPayment = async () => {
    if (+amount > balance) {
      return setErrMsg(`Insufficient Fund. Please Credit Your account`);
    }

    setLoading(true);
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      type fieldType = {
        amount: string;
        provider: string;
        bill_type: string;
        user_credit_id: string;
        tvPackage?: string;
      };

      const fields: fieldType = {
        amount,
        provider,
        bill_type: billType,
        user_credit_id: UserCreditId,
        tvPackage: tvPackage,
      };

      provider !== "DSTV" && provider !== "GOTV" && delete fields.tvPackage;

      const { data } = await axios.post(
        `${BASE_URL}transaction/pay/bill`,
        fields
      );
      if (data) {
        setLoading(false);
        setSuccess(true);
        setAmount("");
        setProvider("");
        setBillType("");
        setReload((prev) => prev + 1);
      }
    } catch (err: any) {
      if (err.response) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg(err.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setBalance(data.account_balance);
    })();
  }, [reload]);

  const packageList = provider === "DSTV" ? DSTVPackage : gotvPackages;

  const disable =
    Number(amount) > balance ||
    amount === "" ||
    billType === "" ||
    provider === "Select Provider"
      ? true
      : false;

  const providerList =
    billType == "Tv"
      ? TvProvider
      : billType == "Electricity"
      ? ElectricityProvider
      : airtimeProvider;

  const itemPlaceholder =
    billType === "Air Time" || billType === "Internet"
      ? "Phone No."
      : "Card No.";

  useEffect(() => {
    const returnPrice = () => {
      if (tvPackage === "Subscription Type") return "Amount"; //default
      const result = packageList.filter((x) => x.name == tvPackage)[0];
      return `${result.amount}`;
    };
    setAmount(returnPrice());
    setAmountPlaceholder(returnPrice());
  }, [tvPackage]);

  return (
    <div>
      {" "}
      <p className="text-lg text-title  tracking-wide font-semibold">
        Pay Bills
      </p>
      <div className="md:mt-10 mt-8 w-full  bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className=" bg-adminbg  rounded-md mb-4 md:h-auto p-3 md:p-6">
          <span className="">
            <p className="text-title font-semibold">Select Bill To Pay : </p>
          </span>
          <div className="grid my-7 gap-2 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 w-full">
            {bills.map((org) => (
              <Bills
                key={org.id}
                setBilltype={setBillType}
                billType={billType}
                org={org}
              />
            ))}
          </div>

          <div className="grid grid-cols-1  mb-6 md:grid-cols-2 gap-5">
            <div className=" col-span-2">
              <Select
                value={provider}
                setValue={setProvider}
                list={providerList}
              />
            </div>
            {provider !== "Select Provider" && (
              <div className=" col-span-2">
                <Input
                  value={UserCreditId}
                  onChange={(e) => setUserCreditId(e.target.value)}
                  placeholder={itemPlaceholder}
                />
              </div>
            )}

            {(provider === "DSTV" || provider === "GOTV") && (
              <div className=" col-span-2">
                <Select
                  value={tvPackage}
                  setValue={setTvPackage}
                  list={packageList}
                />
              </div>
            )}

            <div className=" col-span-2">
              <Input
                disable={
                  provider === "DSTV" || provider === "GOTV" ? true : false
                }
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={amountPlaceholder}
              />
            </div>
          </div>

          <p className="text-base  text-title  tracking-wide font-semibold">
            Balance : ₦{balance}
          </p>

          {errMsg !== "" && <p className="text-red-600 my-3">{errMsg}</p>}
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <div>
          <Button
            disable={disable}
            loading={loading}
            onClick={handleBillPayment}
            text={"Purchase"}
          />
        </div>
      </div>
      <Modal onClose={() => setSuccess(false)} open={success}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />

            <p className="text-lg font-semibold mt-2">Payment Successful</p>
            <p className="text-sm text-center text-textColor mt-2">
              You have successfully completed your transaction."
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default page;
