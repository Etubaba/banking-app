"use client";

import { BsPerson } from "react-icons/bs";
import { AiOutlineDown, AiOutlineLogin } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, useStore } from "@/store";
import { deleteCookie } from "cookies-next";
import { useState } from "react";

const HeaderAuth = () => {
  const [logoutT, setLogout] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const handleAuth = useAuthStore((state) => state.handleAuth);
  const user: any = useStore((state) => state.user);

  const router = useRouter();

  const logout = () => {
    handleAuth(false);
    deleteCookie("_t4t5wm");
    deleteCookie("_er3434");
    router.push("/auth/login");
  };
  return (
    <div>
      {" "}
      {isLoggedIn ? (
        <div className="flex space-x-3 items-center relative">
          <div className="text-sm text-primary flex space-x-2 items-center">
            {" "}
            <p>Hi,</p> <p>{user?.full_name}</p>
          </div>
          <div onClick={() => setLogout(!logoutT)} className="cursor-pointer">
            <img
              src={user?.avatar === null ? "/user.png" : user.avatar}
              className="rounded-full w-10 h-10"
            />
          </div>
          <AiOutlineDown
            className="text-sm text-textcolor cursor-pointer"
            onClick={() => setLogout(!logoutT)}
          />
          {logoutT && (
            <div className="absolute -right-6 mt-20 ">
              <button
                onClick={logout}
                className="flex hover:bg-orangehover flex-row items-center bg-orange text-white px-2 py-1 space-x-1 text-sm rounded-md"
              >
                <AiOutlineLogin />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center space-x-2">
          <Link href={"/auth/register"}>
            <button className="flex hover:bg-slate-100 flex-row items-center bg-white border border-gray-400 px-2 py-1 space-x-1 text-sm rounded-md">
              <BsPerson />

              <span>Register</span>
            </button>
          </Link>
          <Link href={"/auth/login"}>
            <button className="flex hover:bg-orangehover flex-row items-center bg-orange text-white px-2 py-1 space-x-1 text-sm rounded-md">
              <AiOutlineLogin />

              <span>Login</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderAuth;
