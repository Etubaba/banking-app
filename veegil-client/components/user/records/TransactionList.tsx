"use client";

import { transactionTableHead } from "@/constant/mock";
import { RecordType } from "@/interface";
import React, { useState } from "react";

const TransactionList = ({ record }: { record: RecordType[] }) => {
  const [filterView, setFilterView] = useState("all");
  return (
    <div>
      <div className="flex mb-8 md:flex-row flex-col  justify-start md:justify-between items-center">
        <p className="text-title">Transaction List</p>

        <div className="flex space-x-2 items-center">
          <button
            onClick={() => setFilterView("all")}
            className={`border  ${
              filterView === "all" ? "bg-black/30" : ""
            } hover:bg-black/30 min-w-[100px] border-primary px-2 py-1 text-sm rounded-md text-center`}
          >
            All
          </button>
          <button
            onClick={() => setFilterView("credit")}
            className={`border  ${
              filterView === "credit" ? "bg-black/30" : ""
            } hover:bg-black/30 min-w-[100px] border-primary px-2 py-1 text-sm rounded-md text-center`}
          >
            Credit
          </button>
          <button
            onClick={() => setFilterView("debit")}
            className={`border  ${
              filterView === "debit" ? "bg-black/30" : ""
            } hover:bg-black/30 min-w-[100px] border-primary px-2 py-1 text-sm rounded-md text-center`}
          >
            Debit
          </button>
        </div>
      </div>

      <div className="relative border  flex flex-col justify-start items-start shadow-sm w-full rounded-lg h-4/5">
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                {transactionTableHead.map((item, idx) => (
                  <th key={idx} scope="col" className="px-6 py-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {record
                .filter((record) => {
                  if (filterView === "all") return record;
                  else if (record.transaction_type.toLowerCase() == filterView)
                    return record;
                })
                .sort((a: RecordType, b: RecordType) => {
                  const dateA = new Date(a.created_at).getTime(); // Convert to number
                  const dateB = new Date(b.created_at).getTime(); // Convert to number
                  return dateB - dateA; // Sort in descending order
                })

                .map((record: RecordType, idx: number) => (
                  <tr key={idx} className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap "
                    >
                      {record.transaction_type.toUpperCase()}
                    </th>
                    <td className="px-6 py-4">{record.sender_name}</td>
                    <td className="px-6 py-4">{record.amount}</td>
                    <td className="px-6 py-4">
                      {new Date(record.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-green-700 px-1 py-0.5 bg-[#f2fbf6] rounded-md flex justify-center items-center text-xs">
                        Completed
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
