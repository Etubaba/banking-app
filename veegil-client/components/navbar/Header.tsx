import Link from "next/link";
import HeaderAuth from "./HeaderAuth";

const Header = () => {
  return (
    <div className=" px-8 py-3 z-50 hidden md:flex shadow-sm bg-white sticky top-0 justify-between items-cente">
      <Link href={"/"}>
        <div className="flex cursor-pointer">
          <h2 className="text-primary font-semibold">Find</h2>
          <h2 className="text-orange font-semibold">Prosper</h2>
        </div>
      </Link>

      <HeaderAuth />
    </div>
  );
};
export default Header;
