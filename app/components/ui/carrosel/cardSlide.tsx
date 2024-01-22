
import Image from "next/image";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import Card from "@/app/interfaces/Card";
interface CardSlideProps{
  data:  Card
}
function CardSlide({ data }:CardSlideProps) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(data.id);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const generateTitle = data.title.split(" ").join("&").toLowerCase()
  
  const parcelas = parseFloat(data.price) / 6;
  return (
    <div
      className="relative w-full max-w-sm group transition-transform ease-in-out duration-200 transform hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={`/shop/product/${data.id}/${generateTitle}`} className="object-cover flex justify-center items-center">
        
        <Image
          width={200}
          height={200}
          quality={100}
          src={isHovered ? data.images[1].url : data.images[0].url}
          alt="a"
          className="border-image w-full h-full bg-center max-h-[275px]"
        />
      </a>
      <div className="py-2 px-1 flex-col flex justify-between min-h-[112px]">
        {" "}
        <Link href={`/shop/product/${data.id}/${generateTitle}`}>

        <div>
          <h5 className="text-sm tracking-tight text-custom-textColor line-clamp-2">
            {data.title}
          </h5>
        </div>
        <div className="flex flex-col w-full justify-between">
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl text-custom-pink">$ {data.price} </span>
            <span className="text-custom-grayThree text-xs">in cash</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-custom-textColor/40">
              {" "}
              6x of ${parcelas.toFixed(2)}
            </span>
          </div>
        </div>
        </Link>
      </div>
      <div
        className="soft-entry2 absolute z-40 bottom-3 min-h-[130px] bg-opacity-10 bg-white backdrop-blur-md
 w-full hidden group-hover:flex flex-col"
      >
        <Link
          href="#"
          className="mt-4 mx-4 shadow-snipped bg-custom-pink py-2 text-base flex items-center justify-center text-custom-textColor font-medium px-10 rounded-md duration-200 transition-all ease-linear hover:bg-custom-pink/60 cursor-pointer"
        >
          add cart
        </Link>
        <Link
          href="#"
          className="mt-4 mx-4 shadow-snipped bg-custom-grayTwo py-2 text-base flex items-center justify-center text-custom-textColor font-medium px-10 rounded-md duration-200 transition-all ease-linear hover:bg-custom-grayTwo/60 cursor-pointer"
        >
          buy now
        </Link>
      </div>
    </div>
  );
}

export default CardSlide;
