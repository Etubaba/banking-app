"use client";

import React, { useState } from "react";
import Button from "../common/Button";
import { BASE_URL } from "@/constant";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import axios from "axios";

const AuthForm = ({ login }: { login: boolean }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function auth(data: any) {
    setLoading(true);
    console.log(data);
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
          redirect("/user");
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
          redirect("/user");
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  }

  const handleLogin = async () => {};
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
              {...register("password", { required: "THis field is required" })}
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
        {/* <button type="submit">Submit</button> */}

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
