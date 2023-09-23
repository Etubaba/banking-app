import DashboardView from "@/components/admin/DashboardView";
import { BASE_URL } from "@/constant";
import { fetchData } from "@/helper/fetchData";
import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiDonateHeart, BiTransfer } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const page = async () => {
  const [stats, records] = await fetchData([
    `${BASE_URL}transaction/stats`,
    `${BASE_URL}transaction/records`,
  ]);

  return (
    <div>
      {" "}
      <p className="text-lg text-title mb-6 dark:text-white tracking-wide font-semibold">
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
    </div>
  );
};

export default page;
