"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const pathname = usePathname();

  const checkPath = (): boolean => {
    const userPaths = ["/user", "/admin"];
    for (const path of userPaths) {
      if (pathname.startsWith(path)) return true;
    }

    return false;
  };

  if (checkPath()) return null;

  return (
    <div className="bg-[#101923] w-full">
      <div className="2xl:max-w-7xl 2xl:mx-auto">
        <div className="hidden md:flex items-center justify-between pt-16 md:px-16">
          <Link href={"/"}>
            <div className="flex cursor-pointer">
              <h2 className="text-white font-semibold">𝖅𝖊𝖊</h2>
              <h2 className="text-orange font-semibold">𝔴𝔞𝔩𝔩𝔢𝔱</h2>
            </div>
          </Link>

          <h1 className="text-white">Partner with the best</h1>

          <button className="px-3 py-1 border border-white text-white rounded-md">
            Get Started
          </button>
        </div>
        <div className=" p-6 md:p-16 text-white">
          <div className="md:hidden block">
            {" "}
            <Link href={"/"}>
              <div className="flex cursor-pointer">
                <h2 className="text-white font-semibold">𝖅𝖊𝖊</h2>
                <h2 className="text-orange font-semibold">𝔴𝔞𝔩𝔩𝔢𝔱</h2>
              </div>
            </Link>
          </div>

          <div className="flex md:flex-row flex-col  md:justify-between md:items-center">
            <div className="flex flex-col space-y-2 mt-5">
              <p>OFFICE</p>

              <div className="max-w-[220px] ">
                <p className="md:text-base text-sm">
                  No 5, Engr Maxwell Adoki Street, Maraba, Abuja
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-2.5 min-w-[260px]">
              <p className="text-base mt-5">OFFICE</p>

              <p className="text-sm md:text-base">Blogs</p>
              <p className="text-sm md:text-base">E-mail address </p>
              <p className="text-sm md:text-base">Phone Number</p>
            </div>

            <div>
              <p className="text-xl md:block hidden mb-4">Social</p>

              <div className="flex space-x-2 mt-4 md:mb-0">
                {/* <img
                  className="w-6 h-6"
                  src="/Instagram-Icon.png"
                  alt="instagram"
                /> */}
                <AiOutlineTwitter className="text-2xl" />
                <AiOutlineInstagram className="text-2xl" />
                <AiOutlineLinkedin className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow w-full border-t-[0.5px] border-[#919191] dark:border-darkborder "></div>
          </div>

          <div className="flex justify-end items-center">
            <div className="flex space-x-1 items-center justify-center">
              <p className="mt-0.5">©</p>
              <p className="md:text-lg text-sm">
                Zeewallet {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
