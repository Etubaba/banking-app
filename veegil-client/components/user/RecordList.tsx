"use client";
import React, { useState } from "react";
import Records from "./Records";
import { RecordType } from "@/interface";
import Button from "../common/Button";

const RecordList = ({ data }: { data: any }) => {
  const [load, setLoad] = useState(8);
  return (
    <div>
      <div className="border bg-white rounded-md p-5">
        {data.transaction_history
          .reverse()
          .slice(0, load)
          .map((val: RecordType, idx: number) => (
            <Records key={idx} item={val} name={data.full_name} />
          ))}
      </div>

      <div className="my-8 flex justify-center items-center">
        <Button
          onClick={() => setLoad((prev) => prev + 8)}
          type="custom"
          text="Load more"
        />
      </div>
    </div>
  );
};

export default RecordList;
