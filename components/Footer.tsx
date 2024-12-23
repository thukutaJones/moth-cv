import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTiktok } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full p-4 flex flex-col md:flex-row justify-center items-center md:justify-between gap-4">
      <Link href="/" className="hidden md:flex flex-row gap-1 items-center">
        <Image
          src="/logo.png"
          height={50}
          width={50}
          alt="Logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-xl text-blue-600 font-bold">MothCV</h1>
      </Link>
      <p className="text-gray-400 text-sm">© 2024 MothCV, Inc.</p>
      <div className="flex flex-row gap-4">
        <FaTiktok color="black" size={25} />
        <FaFacebookF color="black" size={25} />
        <FaInstagram color="black" size={25} />
        <FaWhatsapp color="black" size={25} />
        <IoMdMail color="black" size={25} />
      </div>
    </div>
  );
};

export default Footer;
