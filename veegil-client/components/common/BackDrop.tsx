import React from "react";

const BackDrop = () => {
  return (
    <div className="fixed z-50  left-0  bg-white/70 right-0 bottom-0    w-full h-screen flex justify-center items-center">
      <div className="spinner"></div>
    </div>
  );
};

export default BackDrop;
