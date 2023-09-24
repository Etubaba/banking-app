import { BASE_URL } from "@/constant";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(BASE_URL + "auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token }),
    });
    // console.log(response);
    const data = await response.json();

    if (data.user) {
      setCookie("_t4t5wm", data.refreshToken, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("_er3434", data.accessToken, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      const role = data.user.role.includes("admin") ? "admin" : "user";

      return { isValid: true, role };

      // redirect("/user");
    }
    return { isValid: false, role: "user" };
  } catch (err: any) {
    console.log("err", err.message);
    return { isValid: false, role: "user" };
  }
};
