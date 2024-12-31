import React from "react";
import { TbFileDescription, TbFileCv } from "react-icons/tb";
import { LiaHandshake } from "react-icons/lia";
import { GrAnnounce } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { servicesData } from "@/constants/servicesData";
import Link from "next/link";

const Services = () => {

  const icons = [
    <TbFileCv className="h-full w-full"  color="white" />,
    <LiaHandshake className="h-full w-full" color="white" />,
    <TbFileDescription className="h-full w-full" color="white" />,
    <GrAnnounce className="h-full w-full" color="white" />,
    <LiaHandshake className="h-full w-full" color="white" />,
    <FaLinkedin className="h-full w-full" color="white" />,
  ];

  return (
    <div className="">
      <div className="relative w-full h-[50vh]">
        <div className="absolute top-0 left-0 h-full w-full bg-opacity-70 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-400 animated  wow fadeInLeft">Our Services</h2>
        </div>
      </div>
      <div className="md:flex-1 flex flex-col md:flex-row md:flex-wrap p-8 md:p-36 md:gap-10 justify-around">
        {servicesData?.map((item: any, index: number) => (
          <div
            key={index.toString()}
            className="relative bg-white px-8 py-20 rounded-xl w-full md:max-w-[30%] min-h-[300px] mt-24 md:mt-10"
          >
            <p className="text-black font-bold text-xl text-center">
              {item.title}
            </p>
            <p className="text-sm text-gray-400 font-sans mt-4 mb-8">
              {item?.description}
            </p>
            <Link href='/sign-in' className="absolute bottom-4 right-4 px-2 border-b-2 hover:border-blue-600">
              <p className="text-black font-semibold">Check it</p>
            </Link>
            <div className="absolute bg-blue-400 p-4 -top-[12.5%] left-[35%] h-[25%] w-[30%] rounded-xl flex items-center justify-center">
              {icons[item?.id]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
