"use client";

import React, { useState } from "react";
import Button from "../../../../components/common/Button";
import { TbEdit } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useSnackbar } from "notistack";
import { useStore } from "@/store";
import { userProps } from "@/interface";
import { BASE_URL } from "@/constant";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();

  const [profilepic, setProfilePic] = useState(searchParams.get("avatar"));
  const [blob, setBlob] = useState<any>(null);

  const [full_name, setFull_name] = useState(searchParams.get("full_name"));

  const [email, setEmail] = useState(searchParams.get("email"));
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/svg": [],
    },
    onDrop: (acceptedFiles) => {
      setProfilePic(URL.createObjectURL(acceptedFiles[0]));
      setBlob(acceptedFiles);
    },
  });

  const updateDetails = async () => {
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const formData = new FormData();

      formData.append("full_name", full_name as string);
      formData.append("email", email as string);
      formData.append("avatar", blob[0]);

      const { data } = await axios.patch(
        `${BASE_URL}user/update/${searchParams.get("id")}`,
        formData
      );

      if (data) {
        setLoading(false);
      }
    } catch (err: any) {
      if (err.response) {
        setLoading(false);
        const msg = err.response.data.message;
        if (typeof msg === "string") {
          enqueueSnackbar(msg, {
            variant: "error",
          });
        } else {
          for (let i = 0; i < msg?.length; i++) {
            enqueueSnackbar(msg[i], {
              variant: "error",
            });
          }
        }
      } else {
        enqueueSnackbar(`Something went wrong. Try again`, {
          variant: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className=" flex mb-6 justify-between items-center">
        <p className="text-lg  tracking-wide font-semibold">User Profile</p>{" "}
        <button
          onClick={updateDetails}
          className="text-sm flex px-3 py-[4px] rounded-md space-x-1 bg-primary text-white"
        >
          <MdOutlineSave className="text-lg" />
          <p>Save</p>
        </button>
      </div>

      <div className="py-5 px-5 mb-6 bg-white rounded-lg border  flex-col md:flex-row w-full flex md:items-center md:justify-between ">
        <div className="flex flex-col md:flex-row md:space-y-0 justify-center mb-10 md:mb-0 items-center md:space-x-4">
          <div>
            {" "}
            <img
              src={
                profilepic === null || profilepic === ""
                  ? "/user.png"
                  : profilepic
              }
              className="w-20 mb-4 md:mb-0 md:mr-2 h-20 rounded-full"
              alt=""
            />
            <div {...getRootProps()}>
              <AiOutlineCamera className="text-white -mt-2 bg-primary text-xl rounded-full p-1 relative left-[70%] bottom-5  cursor-pointer hover:text-[#ececec]" />
              <input {...getInputProps()} type="file" className="hidden" />
            </div>
            {/* <span><AiOutlineCamera/></span> */}
          </div>

          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-2">
            <p className="text-title font-semibold">
              {searchParams.get("full_name")}
            </p>
            <p className="text-textcolor text-xs md:text-sm"> User Account </p>
          </div>
        </div>
      </div>
      <p className="font-semibold mb-4">Profile Information:</p>
      <div className="bg-white py-4 md:py-8   rounded w-full h-auto border ">
        <div className="md:w-[65%] px-4 md:px-6">
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor ">Full Name</label>
            <input
              onChange={(e) => setFull_name(e.target.value)}
              defaultValue={searchParams.get("full_name") as string}
              type={"text"}
              placeholder=" "
              className="border-[0.7px] text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Phone</label>
            <input
              disabled={true}
              defaultValue={searchParams.get("phone") as string}
              type={"text"}
              placeholder=" "
              className="border-[0.7px] text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Email</label>
            <input
              defaultValue={searchParams.get("email") as string}
              onChange={(e) => setEmail(e.target.value)}
              type={"text"}
              placeholder=" "
              className="border-[0.7px]  text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[75%] p-1 border-gray-300"
            />
          </div>
        </div>
        <div className="border-b my-8"></div>

        <div className="md:w-[65%] px-4 md:px-6">
          <div className="md:flex w-full items-center justify-between mb-4">
            <label className="text-base text-textColor">Country</label>
            <div className="w-full md:w-[75%]">
              <input
                disabled={true}
                defaultValue={"Nigeria"}
                type={"text"}
                placeholder=" "
                className="border-[0.7px]  text-textColor rounded-md focus:border-scudGreen  outline-0 w-full md:w-[100%] p-1 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-3 py-1 rounded-md text-sm  mr-2">
          Cancel
        </button>
        <div>
          <Button loading={loading} onClick={updateDetails} text={"Save"} />
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default Profile;
