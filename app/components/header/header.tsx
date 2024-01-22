import React from 'react'
import Image from "next/image";
import logo from "../../assets/bird-logo.png";
import Link from "next/link";

import { AiOutlineUser } from "react-icons/ai";
import SearchInput from "../ui/searchInput";
import ButtonsHeader from "./buttonsHeader";
import { PiUserCircleLight, PiUserCirclePlus } from 'react-icons/pi';
import { LiaUserCircle } from "react-icons/lia";
import { RiMapPinUserFill, RiMapPinUserLine } from 'react-icons/ri';
interface headerProps {
  href: string;
}

async function Header({ href }: headerProps) {
  return (
    <>
      <header className="flex justify-between items-center bg-custom-grayTwo py-4 px-7 beforeEffect afterEffect absolute top-0 left-0 w-full z-50 max-sm:px-3">
        <Link className="flex w-fit gap-3 items-center" href={"/shop"}>
          <Image
            src={logo}
            alt="logo image"
            width={35}
            height={35}
            className=""
          />
          <p className="max-w-[80px] leading-5 text-[15px] tracking-widest text-white max-md:text-base max-sm:text-sm">
            URBAN VOGUE
          </p>
        </Link>
        <SearchInput classname="max-md:hidden w-[60%]"/>
        <ul className="flex gap-6 items-center justify-center mt-1">
        <ButtonsHeader />
          <li className=" text-[30px] text-white duration-200 transition-all  -translate-y-1 ease-linear hover:-translate-y-2.5 hover:text-custom-pink cursor-pointer max-md:text-[28px] mt-1">
            <Link href={href}>
              {href === "/my-account" ? <LiaUserCircle /> :  <PiUserCirclePlus />}
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
 