import { aboutUsData } from "@/constants/aboutUsData";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-[80px]">
      <div className="relative">
        <Image
          src="/interview.jpg"
          width={1000}
          height={1000}
          alt="cover Photo"
          className="w-full md:h-[calc(100vh-100px)]"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-70 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="text-sm mt-4 font-sans">
            Building Futures, One Resume at a Time
          </p>
        </div>
      </div>
      <div className="">
        {aboutUsData?.map((item: any, index: number) => (
          <div
            className={`w-full ${!(index % 2) && 'bg-white'} p-8 md:p-36 flex flex-col items-center justify-center`}
            key={index.toString()}
          >
            <h3 className="text-black text-3xl font-bold">{item?.title}</h3>
            <p className="text-gray-600 font-sans mt-4">{item?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
