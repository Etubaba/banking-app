"use client";
import { selectType } from "@/interface";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ setValue, value, list, position }: selectType) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`py-2 px-2 cursor-pointer rounded-md  border  flex ${
          open ? "border-primary" : ""
        }  items-center justify-between`}
      >
        <p
          className={`text-xs ${
            open ? "text-primary" : " text-textcolor"
          }  mr-1`}
        >
          {value}
        </p>

        <IoIosArrowDown
          onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className={`${
            open ? "text-primary " : "text-textcolor dark:text-textwhite"
          }   text-sm mt-[2px]`}
        />
      </div>
      {open && (
        <div
          className={`max-h-[100px] pb-5 ${list.length == 0 && "p-2"}
                  mt-1 w-full  p-3 absolute dark:border-darkborder cursor-pointer dark:bg-dark2 bg-white rounded border overflow-y-auto  transition  duration-300 ease-in z-40 shadow-lg`}
        >
          {list.map((item, index) => (
            <div
              onClick={() => {
                setValue(item.name);
                setOpen(false);
              }}
              key={index}
              className="flex space-x-1 p-2  hover:bg-adminbg items-center"
            >
              <div>
                <img alt="" src={item.image} className="w-4 h-4 " />
              </div>
              <p
                key={index}
                className="flex  text-textcolor text-sm rounded-md "
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
