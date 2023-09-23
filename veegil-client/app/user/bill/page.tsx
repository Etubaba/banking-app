"use client";
import { Modal } from "@/components";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { Bills } from "@/components/user/bill/Bills";
import { BASE_URL } from "@/constant";
import {
  ElectricityProvider,
  TvProvider,
  airtimeProvider,
  bills,
  charityOrg,
} from "@/constant/mock";
import { userProps } from "@/interface";
import { useStore } from "@/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const page = () => {
  const [orgName, setOrgName] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("Select Provider");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const [UserCreditId, setUserCreditId] = useState(""); // this can be phone, dstv id code , and so on

  const [tvPackage, setTvPackage] = useState(""); // for tv sub

  const [success, setSuccess] = useState(false);

  const [reload, setReload] = useState(0);
  const token = getCookie("_er3434");

  const user = useStore((state) => state.user) as userProps;

  const handleDonation = async () => {
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const fields = {
        amount,
        provider,
        organization: orgName,
      };

      const { data } = await axios.post(
        `${BASE_URL}transaction/donate`,
        fields
      );
      if (data) {
        setLoading(false);
        setSuccess(true);
        setAmount("");
        setProvider("");
        setOrgName("");
        setReload((prev) => prev + 1);
      }
    } catch (err: any) {}
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

  const disable =
    amount === "" || orgName === "" || provider === "Select Provider"
      ? true
      : false;

  const providerList =
    orgName == "Tv"
      ? TvProvider
      : orgName == "Electricity"
      ? ElectricityProvider
      : airtimeProvider;

  const itemPlaceholder = orgName === "Air Time" ? "Phone No." : "Card No.";
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
                setBilltype={setOrgName}
                billType={orgName}
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
              {/* <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={"Reason"}
              /> */}
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

            <div className=" col-span-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={"Amount"}
              />
            </div>
          </div>

          <p className="text-base  text-title  tracking-wide font-semibold">
            Balance : ₦{balance}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <div>
          <Button
            disable={disable}
            loading={loading}
            onClick={handleDonation}
            text={"Donate"}
          />
        </div>
      </div>
      <Modal onClose={() => setSuccess(false)} open={success}>
        <div className=" w-[20rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />

            <p className="text-lg font-semibold mt-2">Donation Successfull</p>
            <p className="text-sm text-center text-textColor mt-2">
              You have completed your donation successfully."
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default page;
