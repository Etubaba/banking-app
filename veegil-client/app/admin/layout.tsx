// "use client";

import SideNav from "@/components/admin/layout/SideNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"w-full overflow-hidden"}>
      <div className="flex flex-col justify-between lg:flex-row md:space-y-3 lg:space-y-0 ">
        <div
          id="adminend"
          className="w-full animate__animated hidden md:block animate__fadeInLeft shadow-md  fixed  border-r lg:h-full dark:border-darkborder  lg:w-1/6 pb-24 "
        >
          <SideNav />
        </div>

        <section
          className={
            "w-full md:w-5/6 md:p-5  p-3  2xl:ml-[16rem] shadow-md md:ml-[13.3rem] md:fixed dark:bg-darkbg  bg-[#FDFDFF] h-full pb-16 overflow-y-scroll"
          }
        >
          {children}
        </section>
      </div>
    </div>
  );
};

export default layout;
