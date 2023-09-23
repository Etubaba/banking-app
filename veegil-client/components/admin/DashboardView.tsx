import { dasboardCompo } from "@/interface";
import React from "react";

const DashboardView = ({ color, Icon, value, title, link }: dasboardCompo) => {
  const divColor =
    color === "red"
      ? "border-red-600"
      : color == "green"
      ? "border-green-600"
      : color == "yellow"
      ? "border-yellow-400"
      : "border-blue-800";

  const iconColor =
    color === "red"
      ? "bg-red-600"
      : color == "green"
      ? "bg-green-600"
      : color == "yellow"
      ? "bg-yellow-400"
      : "bg-blue-800";

  return (
    <div
      //   onClick={toPath}
      className={`shadow-lg ${
        link !== undefined && "cursor-pointer"
      } rounded-md h-24 justify-start items-center w-full ${divColor} flex p-5 space-x-2 border`}
    >
      <div
        className={`${iconColor} p-3 flex justify-center items-center rounded-full text-white`}
      >
        <Icon className="text-xl " />
      </div>
      <div>
        <p className="font-semibold text-title  text-lg md:text-xl">{value}</p>
        <p className="text-[#9E9FA3]  md:text-xs">{title}</p>
      </div>
    </div>
  );
};

export default DashboardView;
