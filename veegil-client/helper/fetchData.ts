import { cookies } from "next/headers";

export async function fetchData(urls: string[]) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("_er3434");
  const token = cookie?.value as string;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const fetchPromises = urls.map((url) => fetch(url, { headers }));
    const responses = await Promise.all(fetchPromises);
    const responseData = await Promise.all(
      responses.map((response) => response.json())
    );

    return responseData;
  } catch (error: any) {
    return [];
  }
}
