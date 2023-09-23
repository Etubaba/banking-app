import { BillProps } from "@/interface";
import React from "react";

export const Bills = ({
  org: { id, name, Icon },
  setBilltype,
  billType,
}: {
  org: BillProps;
  setBilltype: any;
  billType: string;
}) => {
  return (
    <div
      onClick={() => setBilltype(name)}
      className={`border-primary ${
        billType === name ? "bg-black/20" : ""
      } cursor-pointer hover:bg-black/20 space-x-1 px-2 py-1.5 border rounded-md justify-center items-center flex`}
    >
      <div className="w-6 h-6 ">
        <Icon className="text-textcolor mt-1" />
      </div>

      <p className="text-sm text-textcolor">{name}</p>
    </div>
  );
};
