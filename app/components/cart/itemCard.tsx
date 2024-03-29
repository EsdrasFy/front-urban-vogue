"use client";
import { Checkbox, Select } from "@chakra-ui/react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import React, { useContext, useEffect, useRef, useState } from "react";
import imgg from "@/app/assets/krgkuf4j.bmp";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import Card from "@/app/interfaces/Card";
import { ContextApp } from "@/app/contexts/ContextApp";
import Link from "next/link";

interface Product {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: Product;
}

interface ItemCardProps {
  key: number;
  dataCart: CartSummary;
  dataId: Card | null;
  quantity: number;
  size: string;
  id: number;
  index: number;
  color: string;
  isLastItem: boolean;
}

function ItemCard({
  dataCart,
  dataId,
  id,
  index,
  quantity,
  color,
  isLastItem,
  size,
}: ItemCardProps) {
  console.log(quantity);
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [qtd, setQtd] = useState(quantity);
  const [selectSize, setSelectSize] = useState(size);
  const [selectColor, setSelectColor] = useState(color);

  const context = useContext(ContextApp);
  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { removeItemFromCart, updateItemQuantity } = context;

  const price = parseFloat(dataId?.price || "0.00");

  const installment = price / 6;

  useEffect(() => {
    const updatedColor = selectColor !== undefined ? selectColor : "default";
    const updatedSize = selectSize !== undefined ? selectSize : "default";
    updateItemQuantity(id, index, qtd, updatedSize, updatedColor);
  }, [qtd, selectColor, selectSize]);

  const generateTitle = dataId?.title.split(" ").join("&").toLowerCase();

  return (
    <li
      className={`${
        isLastItem
          ? ""
          : "border-solid border-b-[1px] pb-6 border-custom-grayThree"
      } mt-4 flex items-center justify-between gap-2 max-sm:flex-wrap`}
    >
      <div className="w-full flex gap-2">
        <Link
          href={`/shop/product/${dataId?.id}/${generateTitle}`}
          className="max-w-[65px] min-w-[65px] h-[100px] shadow-snipped object-contain"
        >
          <Image
            src={dataId?.images[0].url || ""}
            alt={dataId?.images[0].url || ""}
            width={100}
            height={100}
            className="h-full"
          />
        </Link>
        <div className="flex flex-col min-h-[100px] w-full justify-between gap-2 mr-4 max-sm:mr-0">
          <div className="flex justify-between mr-8 flex-col max-sm:mr-0">
            <Link href={`/shop/product/${dataId?.id}/${generateTitle}`}>
              <h3 className="line-clamp-1 duration-300 ease-linear hover:underline cursor-pointer w-full">
                {dataId?.title}
              </h3>
            </Link>
            <div>
              <p className="text-custom-pink text-xl">
                $ {price}{" "}
                <span className="text-sm text-custom-grayThree">
                  {" "}
                  or in 6x of {installment.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2 ">
            {dataId && dataId.sizes.length !== 0 && (
              <Select
                iconColor="#ed145b"
                icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                onBlur={() => setArrow1(false)}
                value={selectSize}
                onClick={() => setArrow1(!arrow1)}
                onChange={(e) => setSelectSize(e.target.value)}
                _focus={{
                  borderColor: "#ed145b",
                  boxShadow: "0 0 0 1px #ed145b",
                }}
                className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
              >
                {dataId?.sizes.map((size) => (
                  <option value={size.size} key={size.size}>
                    {size.size}
                  </option>
                ))}
              </Select>
            )}

            {dataId && dataId.colors.length !== 0 && (
              <Select
                iconColor="#ed145b"
                icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                onBlur={() => setArrow2(false)}
                onClick={() => setArrow2(!arrow2)}
                value={selectColor}
                onChange={(e) => setSelectColor(e.target.value)}
                _focus={{
                  borderColor: "#ed145b",
                  boxShadow: "0 0 0 1px #ed145b",
                }}
                className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
              >
                {dataId.colors.map((color) => (
                  <option key={color.name_color} value={color.name_color}>
                    {color.name_color}
                  </option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[100px] justify-between items-end max-sm:w-full max-sm:flex-row max-sm:h-auto max-sm:mt-3">
        <div className="flex gap-3 items-center">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setQtd(qtd > 1 ? qtd - 1 : qtd)}
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="flex-shrink-0 shadow-snipped bg-custom-grayTwo hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
            >
              <svg
                className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                aria-hidden="true"
                xmlns="http:
                //www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              className="flex-shrink-0 mx-2 text-custom-pink font-extrabold dark:text-white border-0 bg-transparent text-lg focus:outline-none focus:ring-0 max-w-[3.5rem] text-center"
              value={quantity}
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="flex-shrink-0 bg-custom-grayTwo shadow-snipped hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
              onClick={() => setQtd(qtd + 1)}
            >
              <svg
                className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                aria-hidden="true"
                xmlns="http:
                //www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className=" ">
          <button
            className="text-2xl hover:text-custom-pink duration-200 ease-linear hover:scale-110"
            onClick={() => removeItemFromCart(id, index)}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
