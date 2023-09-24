"use client";
import React, { useState } from "react";
import SideNavLink from "./SideNavLink";

import { BiDonateHeart, BiLogOut, BiTransfer } from "react-icons/bi";

import { BsPeople } from "react-icons/bs";
import { useRouter, redirect } from "next/navigation";
import { SideNavType } from "@/interface";
import { deleteCookie } from "cookies-next";
import { useAuthStore, useStore } from "@/store";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";

const SideNav = ({ setShow, show }: SideNavType) => {
  const router = useRouter();
  const [currentIndex, setIndex] = useState(0);
  const handleUser = useAuthStore((state) => state.handleAuth);
  const handleUserProps = useStore((state) => state.authenticateUser);
  const logout = () => {
    handleUser(false);
    handleUserProps(null);
    deleteCookie("_er3434");
    deleteCookie("_t4t5wm");

    localStorage.removeItem("_tysfjj");
    redirect("/auth");
  };

  const sideNavList = [
    {
      id: 1,
      iconName: <MdOutlineDashboard />,
      text: "Dashboard",
      href: "/admin",
    },
    {
      id: 2,
      iconName: <BsPeople />,
      text: "Users",
      href: "/admin/users",
    },
    {
      id: 3,
      iconName: <BiTransfer />,
      text: "Transactions",
      href: "/admin/transactions",
    },
    {
      id: 4,
      iconName: <BiDonateHeart />,
      text: "Donations",
      href: "/admin/donations",
    },
  ];
  return (
    <div className="py-4 pl-4 h-full bg-primary dark:bg-darkbg  pr-4 relative md:static">
      <div className="h-full  ">
        {sideNavList.map((sideNav, index) => (
          <SideNavLink
            iconName={sideNav.iconName}
            text={sideNav.text}
            href={`${sideNav.href}`}
            setIndex={setIndex}
            currentIndex={currentIndex}
            setMenu={setShow}
            index={index}
            key={sideNav.id}
          />
        ))}

        <div className="w-[95%] flex mt-16 md:mt-72 border-t border-slate-400 pt-4">
          <div
            onClick={logout}
            className="  cursor-pointer text-red-600 hover:text-red-700 mb-3 items-center  flex space-x-1 "
          >
            <BiLogOut className=" text-lg  " />
            <p className="">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
