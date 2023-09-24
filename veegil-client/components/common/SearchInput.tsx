"use client";
import { searchInputType } from "@/interface";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = ({ value, onChange }: searchInputType) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`shadow-sm border ${
        active && "border-primary"
      } w-full md:w-[20rem]  flex px-3 py-1 rounded-lg  bg-white`}
    >
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        placeholder="search..."
        className=" outline-none   placeholder:font-[300]  w-full"
        type={"text"}
      />
      <div className="bg-primary p-1.5  rounded-full flex justify-center items-center">
        <BsSearch className="text-white text-sm" />
      </div>
    </div>
  );
};

export default SearchInput;
