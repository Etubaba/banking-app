"use client";
import { userProps } from "@/interface";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import SearchInput from "../common/SearchInput";
import { UserTableHead } from "@/constant/mock";
import Link from "next/link";
import Modal from "../common/Modal";
import { MdDoNotDisturbAlt, MdErrorOutline } from "react-icons/md";
import Button from "../common/Button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { getCookie } from "cookies-next";
import { BASE_URL } from "@/constant";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../common/Loader";

const Users = ({ users }: { users: userProps[] }) => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const refreshServer = () => {
    return router.replace(path);
  };

  const deactivateUser = async () => {
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const { data } = await axios.delete(
        `${BASE_URL}user/deactivate/${userId}`
      );
      if (data) {
        refreshServer();
        setDeleteModal(false);
        setSuccessModal(true);
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex mb-8 md:flex-row flex-col  justify-start md:justify-between md:items-center">
        <p className="text-title mb-4 md:mb-0">User List</p>

        <div className="flex space-x-2 items-center">
          <SearchInput
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      <div className="relative border  flex flex-col justify-start items-start shadow-sm w-full rounded-lg h-4/5">
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                {UserTableHead.map((item, idx) => (
                  <th key={idx} scope="col" className="px-6 py-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role[0] === "user")
                .filter((user: userProps) => {
                  if (search === "") return user;
                  else if (
                    user.full_name.toLowerCase().includes(search.toLowerCase())
                  )
                    return user;
                })
                .sort((a: userProps, b: userProps) => {
                  const dateA = new Date(a.created_at as string).getTime(); // Convert to number
                  const dateB = new Date(b.created_at as string).getTime(); // Convert to number
                  return dateB - dateA; // Sort in descending order
                })

                .map((user: userProps, idx: number) => (
                  <tr key={idx} className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap "
                    >
                      <div className="w-full flex justify-center items-center">
                        <img
                          src={user.avatar === null ? "/user.png" : user.avatar}
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{user.full_name}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.account_balance}</td>
                    <td className="px-6 py-4">
                      {new Date(user.created_at as string).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex ml-3 space-x-3 justify-start">
                        <Link
                          href={{
                            pathname: `/admin/users/edit_user`,
                            query: user,
                          }}
                        >
                          <button className="bg-blue-700 border flex space-x-2 hover:bg-blue-700/40   rounded-md p-1">
                            <CiEdit className="text-white" />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            setUserId(user.id);
                            setDeleteModal(true);
                          }}
                          className="bg-red-700 border flex space-x-2 hover:bg-red-700/40   rounded-md p-1"
                        >
                          <MdDoNotDisturbAlt className="text-white" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* delete modal start here  */}
      <Modal onClose={() => setDeleteModal(false)} open={deleteModal}>
        <div className="w-[16rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold text-title dark:text-textwhite mt-2">
              Deactivated User
            </p>
            <p className="text-sm  text-textcolor dark:text-textwhite mt-2">
              You are about to deactivate this user.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-white border min-w-[100px] hover:bg-slate-50 px-2.5 py-1 rounded-md text-sm font-semibold text-textcolor "
            >
              Cancel
            </button>
            <div className="max-w-[12rem]">
              <button
                onClick={deactivateUser}
                className="bg-primary min-w-[100px] flex justify-center items-center  border hover:bg-primary/70 px-2.5 py-1 rounded-md text-sm font-semibold text-white"
              >
                {loading ? <Loader /> : <p>Deactivate</p>}
              </button>
              {/* <Button
                primary
                loading={loading}
              
                text={"Deactivate"}
              /> */}
            </div>
          </div>
        </div>
      </Modal>

      <Modal onClose={() => setSuccessModal(false)} open={successModal}>
        <div className=" w-[16rem] md:w-[24rem]  h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <AiOutlineCheckCircle className="text-green-600 text-5xl" />
            <p className="text-lg text-title dark:text-textwhite font-semibold mt-2">
              User Deactivated.
            </p>
            <p className="text-sm text-textcolor dark:text-textwhite text-center  mt-2">
              This User has been deactivated successfully.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
