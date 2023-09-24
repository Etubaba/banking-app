import TransactionList from "@/components/user/records/TransactionList";
import { BASE_URL } from "@/constant";
import { transactionTableHead } from "@/constant/mock";
import { fetchData } from "@/helper/fetchData";
import { RecordType } from "@/interface";
import React from "react";

const page = async () => {
  const [records] = await fetchData([`${BASE_URL}transaction/records`]);

  const { data: transactionList } = records;
  return (
    <div>
      {" "}
      <p className="text-lg  text-title mb-10  tracking-wide font-semibold">
        Transaction Records
      </p>
      <TransactionList record={transactionList} />
    </div>
  );
};

export default page;
