"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const SideNavLink = ({
  iconName,
  text,
  href,
  //   currentIndex,
  setIndex,
  //   setMenu,
  index,
}: any) => {
  const router = useRouter();

  const path = usePathname();
  const handleClick = () => {
    setIndex(index);
    router.push(href);
  };

  return (
    <Link href={href}>
      <div
        key={index}
        className={
          path === href
            ? "hover:cursor-pointer rounded-md p-2  md:pl-2 md:my-2 md:block text-white  hover:text-slate-200/30 font-semibold"
            : "hover:cursor-pointer rounded-md p-2  md:pl-2 md:my-2 md:block hover:text-slate-100/40  text-white  font-light"
        }
        onClick={handleClick}
      >
        <div className="flex space-x-2 items-center">
          <div>{iconName}</div>
          <div className="capitalize">{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default SideNavLink;
