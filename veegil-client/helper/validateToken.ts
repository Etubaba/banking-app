import { BASE_URL } from "@/constant";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

export const validateToken = async () => {
  try {
    // const cookieStore = cookies();
    const token = getCookie("_t4t5wm");

    const response = await fetch(BASE_URL + "auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token }),
    });
    const data = await response.json();
    if (data.ok) {
      setCookie("_t4t5wm", data.refreshToken, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("_er3434", data.accessToken, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      redirect("/user");
    }
  } catch (err) {
    redirect("/auth/login");
  }
};
