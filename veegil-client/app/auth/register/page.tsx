import AuthForm from "@/components/auth/AuthForm";
import React from "react";

const page = () => {
  return (
    <div className="bg-[url('/Rectangle138.png')] px-4  bg-left-top flex justify-center items-center w-full h-screen">
      <AuthForm login={false} />
    </div>
  );
};

export default page;
