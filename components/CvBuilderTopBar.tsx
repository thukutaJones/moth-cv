"use client";

import { pages } from "@/constants/createCVFields";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const CvBuilderTopBar = () => {
  const currentRoute = usePathname();

  return (
    <div className="w-full flex items-center justify-center">
      {pages?.map(
        ({ name, route }: { name: string; route: string }, index: number) => (
          <div key={route} className="flex flex-col mt-4 md:mt-2">
            <p className="hidden md:flex text-sm font-sans overflow-clip text-gray-600">
              {name}
            </p>
            <div className={`flex items-center w-full`}>
              <Link
                href={route}
                className={`h-[20px] w-[20px] ${
                  route === currentRoute
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                } rounded-full flex items-center justify-center`}
              >
                <p className="text-sm">{index + 1}</p>
              </Link>
              {index !== pages.length - 1 && (
                <div
                  className={`h-1 w-5 md:w-[130px] ${
                    pages.findIndex((page) => page.route === route) <=
                    pages.findIndex((page) => page.route === currentRoute) - 1
                      ? "bg-blue-600"
                      : "bg-white"
                  } ${index !== pages.length - 1}`}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CvBuilderTopBar;
