import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Image from "next/image";
import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex-1 w-full relative bg-white">
      <Image
        src="/white4.jpg"
        width={2000}
        height={2000}
        alt="bg"
        className="hidden md:flex h-screen w-full"
      />
      <Image
        src="/white2.png"
        width={1000}
        height={1000}
        alt="bg"
        className="md:hidden h-screen w-full"
      />
      {children}
    </div>
  );
};

export default RootLayout;
