import Users from "@/components/admin/Users";
import { BASE_URL } from "@/constant";
import { fetchData } from "@/helper/fetchData";
import React from "react";

const page = async () => {
  const [userList] = await fetchData([`${BASE_URL}user/all`]);

  const { data: users } = userList;

  return (
    <div>
      {" "}
      <p className="text-lg  text-title mb-10  tracking-wide font-semibold">
        Users
      </p>
      <Users users={users} />
    </div>
  );
};

export default page;
