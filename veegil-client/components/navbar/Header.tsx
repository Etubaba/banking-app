import Link from "next/link";
import HeaderAuth from "./HeaderAuth";

const Header = () => {
  return (
    <div className=" px-8 py-3 z-50 hidden md:flex shadow-sm bg-white sticky top-0 justify-between items-cente">
      <Link href={"/"}>
        <div className="flex cursor-pointer">
          <h2 className="text-primary font-semibold">ʑıŋŋყ</h2>
          <h2 className="text-orange font-semibold">𝔴𝔞𝔩𝔩𝔢𝔱</h2>
        </div>
      </Link>

      <HeaderAuth />
    </div>
  );
};
export default Header;
