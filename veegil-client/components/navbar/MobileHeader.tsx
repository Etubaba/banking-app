"use client";

import React, { useState } from "react";
import Toggle from "./Toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNav from "../admin/layout/SideNav";
import UserNav from "../user/layout/SideNav";

const MobileNav = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const path = usePathname();

  return (
    <div className="relative">
      <div
        className={`md:hidden  bg-white z-[1000]  w-full flex justify-between items-center px-6 py-3`}
      >
        <Link href={"/"}>
          <span className="flex text-sm">
            <h2 className="text-primary font-semibold">𝖅𝖊𝖊</h2>
            <h2 className="text-orange font-semibold">𝔴𝔞𝔩𝔩𝔢𝔱</h2>
          </span>
        </Link>
        <Toggle yes={checked} setChecked={setChecked} />
      </div>
      {checked && !path.startsWith("/user") && !path.startsWith("/admin") && (
        <div
          className={`w-full absolute   z-[900] flex flex-col text-center h-auto justify-center  space-y-2 items-center bg-[#1B242F]`}
        >
          <p
            onClick={() => {
              setChecked(false);

              if (typeof window != "undefined") {
                localStorage.clear();
              }
            }}
            className="hover:bg-[#1B242F]/30 text-white py-3 w-full rounded-md"
          >
            <Link href={"/auth/login"}>
              <p>Login</p>
            </Link>
          </p>
          <p
            onClick={() => {
              setChecked(false);
            }}
            className="hover:bg-[#1B242F]/30 text-white py-3 w-full rounded-md"
          >
            <Link href={"/auth/register"}>
              {" "}
              <p>Register</p>
            </Link>
          </p>
        </div>
      )}

      {checked && path.startsWith("/admin") && (
        <div className="w-[90%] z-50 h-screen animate__animated bg-primary absolute animate__fadeInLeft shadow-md   border-r  ">
          <AdminNav />
        </div>
      )}
      {checked && path.startsWith("/user") && (
        <div className="w-[90%] z-50 bg-white h-screen animate__animated absolute animate__fadeInLeft shadow-md   border-r  ">
          <UserNav />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
