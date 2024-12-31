import React from "react";

import HomeCard from '../../components/HomeCard'
import { cardsData } from "@/constants/homeCardsData";
import Link from "next/link";

const Home = () => {
  return (
    <div className="mt-[80px]">
      <div className="w-full flex items-center justify-center p-4 md:p-16">
        <div className="w-full md:w-[50%] flex flex-col items-center justify-cenetr">
          <p className="text-4xl text-black font-bold text-center animated  wow fadeInLeft">
            How do you want to grow your career?
          </p>
          <p className="mt-4 text-center text-gray-600 text-sm font-sans animated  wow fadeInRight">
            Land your dream job with MothCV's tailored job recommendations,
            professional resume builders, and interview prep tools.
          </p>
          <Link href='/sign-in' className="px-4 py-2 bg-blue-600 mt-4 rounded-lg">
            <p className="font-sans">Get Started</p>
          </Link>
        </div>
      </div>
      <section className="p-6 md:p-10 mt-8 md:mt-20 bg-white w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-700 text-center">What we offer?</h2>
        <div className="w-full md:w-[80%]" >
          {
            cardsData?.map((item: any, index: number) => (
              <HomeCard key={index?.toString()} data={item} index={index}/>
            ))
          }
        </div>
        <Link href='/services' className="px-8 py-2 border-2 border-gray-300 mt-28 rounded-3xl flex items-center justify-center">
          <p className="text-lg text-gray-300 font-semibold cursor-pointer">See More</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
