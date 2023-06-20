import { BsPerson } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";
import Link from "next/link";

const Header = () => {
  const isLoggedIn = false;
  const user = {
    full_name: "Matthew Pee",
  };

  //    const isLoggedIn=useSelector((state:RootState)=>state.note.isLoggedIn)
  //    const user=useSelector((state:RootState)=>state.note.userData)
  return (
    <div className=" px-8 py-3 z-50 hidden font-sans md:flex shadow-sm bg-white sticky top-0 justify-between items-cente">
      <Link href={"/"}>
        <div className="flex cursor-pointer">
          <h2 className="text-primary font-semibold">Find</h2>
          <h2 className="text-orange font-semibold">Prosper</h2>
        </div>
      </Link>

      {isLoggedIn ? (
        <div className="text-sm text-primary flex space-x-2">
          {" "}
          <p>Hi,</p> <p>{user?.full_name}</p>
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
export default Header;
