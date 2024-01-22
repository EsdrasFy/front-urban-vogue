"use client";
import { ContextApp } from "@/app/contexts/ContextApp";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import React, { useContext, useEffect, useRef, useState } from "react";
import imgg from "@/app/assets/krgkuf4j.bmp";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import Card from "@/app/interfaces/Card";
import ProductsById from "@/app/api/ProductsById";
import ItemCard from "./itemCard";
import ButtonIcon from "../ui/buttonIcon";
import { FaArrowRight } from "react-icons/fa";

interface ApiResponse {
  data: ProductResponse | any[];
  status: number;
}

interface ProductResponse {
  products: Card[];
  notFoundIds: number[];
}
interface ProductCart {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}
interface CartSummary {
  totalPrice: number;
  totalQuantity: number;
  products: ProductCart;
}

function Cart() {
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [dataProducts, setDataProducts] = useState<Card[]>([]);

  const context = useContext(ContextApp);
  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { isOpen, onOpen, onClose } = context.disclosure;
  const { cartSummary } = context;

  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query =
        cartSummary?.products.map((product) => product.id).join("&") ?? "";

      try {
        const res: ApiResponse | undefined = await ProductsById(query);
        if (res?.status === 200) {
          if ("products" in res.data) {
            setDataProducts(res.data.products);
          }
        } else {
          console.error("Resposta da requisição não contém dados esperados.");
        }
      } catch (error) {
        console.error("Erro na requisição do produto:", error);
      }
    };

    fetchData();
  }, [cartSummary?.products]);
  return (
    <>
      <Drawer
        size={"lg"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"#171a1b"} textColor={"#d9d9d9"}>
          <DrawerCloseButton className="hover:text-custom-pink" />
          <DrawerHeader className="shadow-snipped">SHOPPING CART</DrawerHeader>
          <Divider />
          <DrawerBody backgroundColor={"#171a1b"}>
            <ul className="flex flex-col gap-2 ">
              {cartSummary?.products.map((product: any, index, array) => {
                const matchingProduct = dataProducts.find(
                  (dataProduct) => dataProduct.id === product.id
                ) as Card | null;
                const isLastItem = index === array.length - 1;

                return (
                  <ItemCard
                    key={index}
                    dataCart={product}
                    quantity={product.quantity}
                    id={product.id}
                    index={index}
                    size={product.size || "default"}
                    color={product.color || "default"}
                    dataId={matchingProduct}
                    isLastItem={isLastItem}
                  />
                );
              })}
            </ul>
          </DrawerBody>

          <Divider className="shadow-snipped" />
          <DrawerFooter
            backgroundColor={"#1d2123"}
            className="w-full flex justify-between"
          >
            <div className="flex justify-between w-full items-center max-sm:">
              <div className="text-xl text-custom-pink">
                TOTAL{" "}
                <span className="text-custom-textColor font-medium ml-2 max-sm:ml-0">
                  ${cartSummary?.totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className={`group bg-none border-2 w-56 border-custom-pink flex gap-12 items-center pl-2 justify-center max-sm:py-2 text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink`}
              >
                  <span>Close order</span>
                  <FaArrowRight
                    className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000"
                  />
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
