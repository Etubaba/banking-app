import React from "react";
import { bottonProps } from "../../interface";
import Loader from "./Loader";

const Button = ({
  text,
  onClick,
  loading,
  disable,
  type,
}: bottonProps): JSX.Element => {
  return (
    <button
      type="submit"
      disabled={disable}
      onClick={onClick}
      className={`text-center cursor-pointer text-sm px-3 text-white py-2 ${
        disable ? "bg-orange/25" : "bg-orange  hover:bg-orangehover"
      }  ${type === "custom" ? "min-w-[50px]" : "w-full"} rounded-md `}
    >
      {loading ? (
        <div className="justify-center  flex items-center">
          <Loader />
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;
