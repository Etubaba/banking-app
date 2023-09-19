import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/constant";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { Transaction, EmptyState, RecordList } from "@/components";
import TransferButton from "@/components/user/TransferButton";

const page = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("_t4t5wm");
  const token = cookie?.value;

  const res = await fetch(`${BASE_URL}user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return (
    <div className=" px-2 py-8 ">
      <div className="flex mb-8 space-y-3 md:space-y-0  md:flex-row flex-col md:items-center md:justify-between">
        <div>
          <div className="flex space-x-2 ">
            <div className="h-20 w-20 rounded-full bg-[#f2fbf6] flex justify-center items-center ">
              <div className="h-14 w-14 flex justify-center items-center rounded-full bg-green-700 ">
                <MdOutlineAccountBalanceWallet className="text-white text-3xl" />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#55575F] ">Nigerian Naira</p>
              <h1 className="text-dark font-bold text-3xl">
                ₦{data?.account_balance}.00
              </h1>
              <p className="text-xs text-[#55575F]/40">
                Last updated 1 seconds ago
              </p>
            </div>
          </div>
        </div>
        <Transaction />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-dark font-semibold mb-6 text">Transaction History</p>
        <TransferButton />
      </div>

      <div className="md:mb-7">
        {data.transaction_history.length === 0 ? (
          <EmptyState
            title={"No Transaction Records"}
            name={"Transaction"}
            Icon={HiOutlineCash}
          />
        ) : (
          <RecordList data={data} />
        )}
      </div>
    </div>
  );
};
export default page;
