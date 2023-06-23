import { Banner, HowItWorks } from "@/components";
import { BASE_URL } from "@/constant";

export default async function Home() {
  //spine up server
  const data = await fetch(`${BASE_URL}api/v1`);
  console.log("Server check", data.json());

  return (
    <div className="">
      <Banner />
      <HowItWorks />
    </div>
  );
}
