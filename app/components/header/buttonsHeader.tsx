"use client"
import React, { useContext } from 'react'
import Link from "next/link";

import { ContextApp } from "@/app/contexts/ContextApp";
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartSimple } from "react-icons/pi";

function ButtonsHeader() {
  const context = useContext(ContextApp);


  if (!context) {
    return null;
  }
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = context.disclosure;
  const { isOpen: isOpenFav, onOpen: onOpenFav, onClose: onCloseFav } = context.disclosureFav;
  const { cartSummary } = context;
  

  return (
    <ul className="flex gap-6 items-center justify-center mt-1">
          <li className=" text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 hover:text-custom-pink cursor-pointer max-md:text-[28px]">
            <button onClick={onOpenFav}>
            <IoIosHeartEmpty />
            </button>
          </li>
          <li className="relative text-3xl text-white duration-200 transition-all ease-linear hover:-translate-y-1.5 group cursor-pointer max-md:text-[28px]">
            <button onClick={onOpenCart} className="group-hover:text-custom-pink">
            <PiShoppingCartSimple />
            </button>
            {cartSummary && cartSummary?.totalQuantity > 0 && ( <span className='w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 border-solid border-2 border-custom-textColor bg-custom-red rounded-full text-[10px] font-bold'>{cartSummary?.totalQuantity}</span>)}
          </li>
        </ul>
  )
}

export default ButtonsHeader