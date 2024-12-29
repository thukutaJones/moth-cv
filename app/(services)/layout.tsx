import HomeTopBar from "@/components/HomeTopBar";
import SideBar from "@/components/SideBar";
import React from "react";

const SrvicesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-screen flex flex-col relative">
      <header className="fixed w-full top-0 left-0 z-20 h-[60px]">
        <HomeTopBar />
      </header>
      <section className="flex h-[calc(100vh-80px)] mt-[60px] w-full">
        <SideBar />
        <div className="overflow-y-auto w-full md:w-[95%]">{children}</div>
      </section>
    </main>
  );
};

export default SrvicesLayout;
