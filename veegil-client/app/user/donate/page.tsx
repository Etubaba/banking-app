"use client";
import { Modal } from "@/components";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { BASE_URL } from "@/constant";
import { charityOrg } from "@/constant/mock";
import { userProps } from "@/interface";
import { useStore } from "@/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const page = () => {
  const [orgName, setOrgName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
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
        reason,
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
        setReason("");
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
    amount === "" || orgName === "" || reason === "" ? true : false;
  return (
    <div>
      {" "}
      <p className="text-lg text-title  tracking-wide font-semibold">
        Donation
      </p>
      <div className="md:mt-10 mt-8 w-full  bg-white border shadow-sm rounded-md p-3 md:p-6">
        <div className=" bg-adminbg  rounded-md mb-4 md:h-auto p-3 md:p-6">
          <span className="">
            <p className="text-title font-semibold">Donate to : </p>
          </span>
          <div className="grid my-7 gap-2 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 w-full">
            {charityOrg.map((org) => (
              <div
                key={org.id}
                onClick={() => setOrgName(org.name)}
                className={`border-primary ${
                  orgName === org.name ? "bg-black/20" : ""
                } cursor-pointer hover:bg-black/20 space-x-2 px-2 py-1.5 border rounded-md justify-center items-center flex`}
              >
                <div className="w-6 h-6">
                  {" "}
                  <img
                    alt=""
                    src={org.image}
                    className=" h-full w-full rounded-full object-fit"
                  />
                </div>

                <p className="text-sm text-textcolor">{org.name}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1  mb-6 md:grid-cols-2 gap-5">
            <div className=" col-span-1">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={"Amount"}
              />
            </div>
            <div className=" col-span-1">
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={"Reason"}
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
