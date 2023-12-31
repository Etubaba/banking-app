import DashboardView from "@/components/admin/DashboardView";
import { BASE_URL } from "@/constant";
import { transactionTableHead } from "@/constant/mock";
import { fetchData } from "@/helper/fetchData";
import { RecordType } from "@/interface";
import Link from "next/link";
import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiDonateHeart, BiTransfer } from "react-icons/bi";
import { BsArrowRightShort, BsPeople } from "react-icons/bs";

const page = async () => {
  const [stats, records] = await fetchData([
    `${BASE_URL}transaction/stats`,
    `${BASE_URL}transaction/records`,
  ]);

  const { data: transactionList } = records;
  return (
    <div>
      <p className="text-lg mt-10 text-title mb-6  tracking-wide font-semibold">
        Dashboard
      </p>
      <div className="w-full flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-4 mb-10">
        <DashboardView
          title="Amount In Transactions"
          color="red"
          value={`₦${stats.amount_in_transaction}`}
          Icon={AiOutlineDollarCircle}
        />
        <DashboardView
          title="Total Users"
          color=""
          value={stats?.total_users}
          Icon={BsPeople}
        />
        <DashboardView
          title="Total Transaction"
          color="yellow"
          value={stats?.total_transactions}
          Icon={BiTransfer}
        />
        <DashboardView
          title="Donations"
          color="green"
          value={`₦${stats.donations}`}
          Icon={BiDonateHeart}
        />
      </div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-textcolor md:mb-0 mb-3 dark:text-textwhite font-semibold">
          Transaction Records
        </p>

        <Link href={"/admin/transactions"}>
          <div className="flex space-x-1 hover:text-primary/40 text-primary items-center">
            <p className=" cursor-pointer text-xs">View all</p>
            <BsArrowRightShort className=" text-lg" />
          </div>
        </Link>
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
              {transactionList
                .sort((a: RecordType, b: RecordType) => {
                  const dateA = new Date(a.created_at).getTime(); // Convert to number
                  const dateB = new Date(b.created_at).getTime(); // Convert to number
                  return dateB - dateA; // Sort in descending order
                })
                .slice(0, 5)
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

export default page;
