"use client";

import React, { useState } from "react";
import Button from "../common/Button";
import { BASE_URL } from "@/constant";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { useAuthStore, useStore } from "@/store";
import BackDrop from "../common/BackDrop";

const AuthForm = ({ login }: { login: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const authenticateUser = useStore((state) => state.authenticateUser);
  const handleAuth = useAuthStore((state) => state.handleAuth);

  // const saveUserDetails = useStore((state) => state.authenticateUser);

  async function auth(data: any) {
    setLoading(true);
    if (login) {
      try {
        const formdata = {
          phone: data["phone"],
          password: data["password"],
        };
        const { data: resData } = await axios.post(
          `${BASE_URL}auth/login`,
          formdata
        );
        if (resData) {
          setLoading(false);
          authenticateUser(resData?.user);
          handleAuth(true);
          setCookie("_er3434", resData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("_t4t5wm", resData.refreshToken, {
            maxAge: 60 * 60 * 60 * 31,
          });
          setDrop(true);
          router.push("/user");
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      try {
        const formdata = {
          phone: data["phone"],
          password: data["password"],
          email: data["email"],
          full_name: data["full_name"],
        };
        const { data: resData } = await axios.post(
          `${BASE_URL}auth/register`,
          formdata
        );
        if (resData) {
          setLoading(false);
          router.push("/auth/login");
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  }

  if (drop) return <BackDrop />;

  return (
    <div className="bg-white shadow-lg animate__fadeIn animate__animated rounded-md w-full md:w-[500px] p-7">
      <p className="text-center text-lg text-[#1e202a] font-semibold">
        {!login ? "Create An Account" : "Login to your account"}
      </p>
      <p className="text-center text-sm text-[#7c7f8a] mb-5">
        Provide your credentials
      </p>

      <form onSubmit={handleSubmit(auth)}>
        <div className=" grid gap-2 grid-cols-1 w-full mb-4   ">
          {!login && (
            <div className="">
              <label
                htmlFor="full_name"
                className="text-xs text-textColor/70 mb-1.5"
              >
                Full Name
              </label>
              <input
                {...register("full_name", {
                  required: "This field is required",
                })}
                type={"text"}
                className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
                // placeholder={"First Name"}
              />
              {errors.full_name !== undefined && (
                <p className="text-red-600 text-xs py-2">
                  This field is required
                </p>
              )}
            </div>
          )}
          <div className="">
            <label htmlFor="phone" className="text-xs text-textColor/70 mb-1.5">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone", { required: "this field is required" })}
              type={"number"}
              className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
              // placeholder={"First Name"}
            />
            {errors.phone !== undefined && (
              <p className="text-red-600 text-xs py-2">
                This field is required
              </p>
            )}
          </div>

          {!login && (
            <div className="">
              <label
                htmlFor="email"
                className="text-xs text-textColor/70 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", { required: "This field is requid" })}
                type={"email"}
                className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
              />
              {errors.email !== undefined && (
                <p className="text-red-600 text-xs py-2">
                  This field is required
                </p>
              )}
            </div>
          )}

          <div className="">
            <label
              htmlFor="password"
              className="text-xs text-textColor/70 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "THis field is required",
              })}
              type={"text"}
              className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
              // placeholder={"First Name"}
            />
            {errors.password !== undefined && (
              <p className="text-red-600 text-xs py-2">
                This field is required
              </p>
            )}
          </div>
        </div>

        <Button
          loading={loading}
          type="submit"
          text={login ? "Login" : "Register"}
        />
      </form>
    </div>
  );
};

export default AuthForm;
