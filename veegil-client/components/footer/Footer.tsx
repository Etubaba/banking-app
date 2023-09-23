"use client";

import { usePathname } from "next/navigation";
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
    <div className="w-full bg-dark h-auto p-10">
      <div className=" flex justify-center space-x-7 items-center">
        <div className="bg-lightdark hover:bg-prosGray p-4">
          <a target="_blank" href="https://github.com/Etubaba">
            <BsGithub className="text-3xl text-white" />
          </a>
        </div>
        <div className="bg-lightdark hover:bg-prosGray p-4">
          <a target="_blank" href="https://www.linkedin.com/in/etumnuprosper/">
            <BsLinkedin className="text-3xl text-white" />
          </a>
        </div>
        <div className="bg-lightdark hover:bg-prosGray p-4">
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCxmoNEugoldA2qliF_AMGWw"
          >
            <BsYoutube className="text-3xl text-white" />
          </a>
        </div>
      </div>

      <p className="text-white mt-10 text-center">
        Etumnu Prosper.{"  "}Ⓒ {year} All rights reserved
      </p>
    </div>
  );
};

export default Footer;
