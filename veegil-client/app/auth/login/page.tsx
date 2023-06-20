import React from "react";
import AuthForm from "../../../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="bg-[url('/Rectangle138.png')] px-4  bg-left-top flex justify-center items-center w-full h-screen">
      <AuthForm login={true} />
    </div>
  );
};

export default Login;
