"use client";

import React, { useState } from "react";
import Toggle from "./Toggle";
import Link from "next/link";

const MobileNav = (): JSX.Element => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div
        className={`md:hidden bg-white z-[1000]  w-full flex justify-between items-center px-6 py-3`}
      >
        <Link href={"/"}>
          <span className="flex text-sm">
            <h2 className="text-primary font-semibold">Find</h2>
            <h2 className="text-orange font-semibold">Prosper</h2>
          </span>
        </Link>
        <Toggle yes={checked} setChecked={setChecked} />
      </div>
      {checked && (
        <div
          className={`w-full sticky top-12  z-[900] flex flex-col text-center h-auto justify-center space-y-4 items-center bg-[#1B242F]`}
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
    </>
  );
};

export default MobileNav;
