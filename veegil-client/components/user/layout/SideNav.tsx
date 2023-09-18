"use client";
import React, { useState } from "react";
import SideNavLink from "./SideNavLink";
import {
  MdOutlineAttachMoney,
  MdOutlineManageAccounts,
  MdOutlinePortrait,
  MdSupportAgent,
} from "react-icons/md";

import { GiPaintBrush } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { BiLogOut, BiDonateHeart, BiTransfer } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BsDisplay, BsMic, BsNewspaper } from "react-icons/bs";
import { useRouter, redirect } from "next/navigation";
import { SideNavType } from "@/interface";
import { deleteCookie } from "cookies-next";
import { useAuthStore, useStore } from "@/store";

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
      iconName: <MdOutlineAccountBalanceWallet />,
      text: "Account",
      href: "/user",
    },
    {
      id: 2,
      iconName: <MdOutlineManageAccounts />,
      text: "Profile",
      href: "/user/profile",
    },
    {
      id: 3,
      iconName: <BiDonateHeart />,
      text: "Donate",
      href: "/user/donate",
    },
    {
      id: 4,
      iconName: <MdOutlineAttachMoney />,
      text: "Bill Payment",
      href: "/user/bill",
    },
  ];
  return (
    <div className="py-4 pl-4 bg-white dark:bg-darkbg  pr-4 relative md:static">
      <div className="h-screen  ">
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

        <div className="w-[95%] flex mt-16 md:mt-60 border-t  pt-4">
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
