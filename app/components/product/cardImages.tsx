import React from "react";
import image from "@/app/assets/model1.webp";
import Image from "next/image";

function CardImages() {
  return (
    <li className="w-14  cursor-pointer border-2 border-solid border-custom-pink">
      <Image alt="a" src={image} />
    </li>
  );
}

export default CardImages;
