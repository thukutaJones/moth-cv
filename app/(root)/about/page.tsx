import HomeCard from "@/components/HomeCard";
import { aboutCardsData } from "@/constants/aboutUsData";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-[80px]">
      <div className="h-[20vh] md:h-[40vh]">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-300 animated wow fadeInLeft">About Us</h2>
          <p className="text-sm mt-4 font-sans text-gray-600 animated wow  fadeInRight">
            Building Futures, One Resume at a Time
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="px-6 md:px-36">
          {aboutCardsData?.map((item: any, index: number) => (
            <HomeCard
              key={index?.toString()}
              data={item}
              index={index}
              about={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
