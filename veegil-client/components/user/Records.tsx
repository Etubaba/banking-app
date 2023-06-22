import { getTimeAgo } from "@/helper/getTimeAgo";
import { RecordType } from "@/interface";
import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

const Records = ({ item, name }: { item: RecordType; name: string }) => {
  const { amount, created_at, sender_name, transaction_type } = item;
  return (
    <div className="border bg-white mb-2 p-2 space-y-3 sm:space-y-0 sm:flex items-center justify-between rounded-md">
      <div className="flex md:mb-0 mb-8 space-x-2 items-center">
        {transaction_type === "credit" ? (
          <div className="h-12 w-12 rounded-full bg-[#f2fbf6] flex justify-center items-center ">
            <div className="h-7 w-7 flex justify-center items-center rounded-full bg-green-700 ">
              <TbCurrencyNaira className="text-white text-3xl" />
            </div>
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-[#fff4f4] flex justify-center items-center ">
            <div className="h-7 w-7 flex justify-center items-center rounded-full bg-red-700 ">
              <TbCurrencyNaira className="text-white text-3xl" />
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold mb-2 text-[#55575F] ">
            {sender_name === null ? name : sender_name}
          </p>
          <p className="text-xs text-[#55575F]/40">{getTimeAgo(created_at)}</p>
        </div>
      </div>

      <span
        className={`font-semibold flex justify-end items-end md:items-center  md:justify-start ${
          transaction_type === "credit" ? "text-green-700" : "text-dark"
        } text-sm md:text-lg`}
      >
        <p className="text-start">{` ${
          transaction_type === "credit" ? "+" : ""
        }₦${amount}.00`}</p>
      </span>
    </div>
  );
};

export default Records;
