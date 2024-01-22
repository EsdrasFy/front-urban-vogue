"use client";
import React, { useContext, useEffect, useState } from "react";
import image from "@/app/assets/model1.webp";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsShare } from "react-icons/bs";
import { RiPencilRuler2Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import InputUi from "@/app/components/ui/InputDefault/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { SlArrowRightCircle } from "react-icons/sl";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
} from "@chakra-ui/react";
import ProductQuery from "@/app/api/ProductQuery";
import Card from "@/app/interfaces/Card";
import { ContextApp } from "@/app/contexts/ContextApp";
import ProductsById from "@/app/api/ProductsById";

type Inputs = {
  cep: string;
};

const schema = yup.object().shape({
  cep: yup.string().required("This field is required!"),
});

interface ProductCart {
  id: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface ApiResponse {
  data: ProductResponse | any[];
  status: number;
}

interface ProductResponse {
  products: Card[];
  notFoundIds: number[];
}

function Page({ params }: any) {
  const [selectImage, setSelectImage] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [qtd, setQtd] = useState(1);
  const [heart, setHeart] = useState(false);
  const [dataCard, setDataCard] = useState<Card>();
  const [price, setPrice] = useState<number>(0);
  const [installment, setInstallment] = useState<number>();

  const context = useContext(ContextApp);

  if (!context) {
    return null;
  }
  const { addItemToCart } = context;

  useEffect(() => {
    const fetchData = async () => {
      const query = params.slug[0];

      try {
        const res: ApiResponse | undefined = await ProductsById(query);
        if (res?.status === 200) {
          if ("products" in res.data) {
            const { price, images, sizes, colors } = res.data.products[0];
            if (price) {
              const priceValue = parseFloat(price);
              setPrice(priceValue);

              const installment = (priceValue / 6).toFixed(2);
              setInstallment(parseFloat(installment));
            }

            if (images?.length > 0) {
              setSelectImage(images[0].url);
            }
            if (sizes?.length > 0) {
              setSelectSize(sizes[0].size);
            }
            if (colors?.length > 0) {
              setSelectColor(colors[0].name_color);
            }

            setDataCard(res.data.products[0]);
          } else {
            console.error("Resposta da requisição não contém dados esperados.");
          }
        } else {
          console.error(
            "Resposta da requisição é undefined ou não contém dados."
          );
        }
      } catch (error) {
        console.error("Erro na requisição do produto:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  const handleAddItem = () => {
    const data = {
      id: dataCard?.id,
      price: price,
      quantity: qtd,
      size: selectSize,
      color: selectColor,
    };

    if (dataCard?.id) {
      addItemToCart(data as ProductCart);
      console.log("Item added to cart!");
    }
  };

  const handleImageClick = (url: string) => {
    setSelectImage(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cep = data.cep;
    try {
      alert("cep pesquisado");
    } catch (error) {
      alert("cep nao pesquisado");
    } finally {
    }
  };

  const handleInputChange = (event: any) => {
    setQtd(event.target.value);
  };

  return (
    <section className="h-full mt-28 mb-28 bg-custom-grayTwo max-w-[1050px] w-full mx-12 p-4 shadow-snipped text-custom-textColor">
      <div className="flex w-full h-[530px] gap-4">
        <div className="w-[40%] h-full flex gap-4">
          <div>
            <ul className="flex flex-col gap-[16.5px] min-h-full">
              {dataCard?.images &&
                dataCard.images.slice(0, 5).map((imagem) => (
                  <li
                    className={`w-14 h-[93px]  cursor-pointer ${
                      selectImage === imagem.url
                        ? "border-2 border-solid border-custom-pink"
                        : "border-2 border-solid border-custom-grayThree opacity-40"
                    } `}
                    key={imagem.url}
                  >
                    <Image
                      alt="a"
                      width={220}
                      height={220}
                      src={imagem?.url}
                      onMouseOver={() => handleImageClick(imagem?.url)}
                      onClick={() => handleImageClick(imagem?.url)}
                      className="shadow-snipped w-full h-full"
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="h-[100%] object-contain w-[100%]">
            {dataCard?.images && dataCard.images.length > 0 && (
              <Image
                quality={100}
                alt={selectImage}
                src={selectImage}
                width={500}
                height={500}
                className="cursor-zoom-in h-full w-full shadow-snipped"
              />
            )}
          </div>
        </div>

        <div className="w-[60%] h-full font-semibold flex flex-col justify-between">
          <div className="flex text-sm items-center text-custom-textColor">
            <span>SHOP</span>
            <span className="text-2xl">
              <MdKeyboardDoubleArrowRight className="" />
            </span>
            <span className="line-clamp-1 text-custom-pink underline uppercase">
              {dataCard?.title.split("-")[1]}
            </span>
          </div>
          <div className="flex text-2xl font-bold mt-2">
            <p>{dataCard?.title}</p>
          </div>

          <div className="flex">
            <p className="font-light ">
              Sold and delivered by{" "}
              <span className="text-custom-pink">Urban Vogue</span>
            </p>
            <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-lg font-semibold text-custom-pink rounded-full dark:bg-gray-700 dark:text-blue-400">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                />
                <path
                  fill="#fff"
                  d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                />
              </svg>
              <span className="sr-only">Icon description</span>
            </span>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div>
              <p className="text-3xl text-custom-pink">$ {price.toFixed(2)}</p>
            </div>
            <div> or </div>
            <div>
              <p className="text-base text-custom-textColor/60">
                6x of {installment?.toFixed(2)}
              </p>
            </div>
          </div>
          <form className="flex-col mt-4">
            <div className="w-full flex gap-2 items-center relative">
              <div className="flex w-full flex-col">
                <InputUi
                  type="text"
                  pleaceholder="00000-000"
                  label="calculate shipping"
                  name="cep"
                  classname="shadow-snipped"
                  register={register}
                />
              </div>
              <button
                type="submit"
                className="py-3.5 rounded-sm absolute right-4 top-7 z-10 flex items-center justify-center text-2xl"
              >
                <SlArrowRightCircle />
              </button>
            </div>
          </form>

          {dataCard && dataCard?.colors.length > 0 && (
            <div className="flex gap-2 mt-4">
              <p>Variations:</p>
              <ul className="flex gap-3">
                {dataCard.colors.map((color, index) => {
                  return (
                    color.name_color !== undefined && (
                      <li className="cursor-pointer shadow-snipped" key={index}>
                        <span
                          className={`text-sm  px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink  ${
                            selectColor === color.name_color
                              ? "bg-custom-grayTwo text-custom-pink border-custom-pink border-[1px] border-solid"
                              : "border-[1px] border-solid bg-custom-grayThree"
                          }`}
                          onClick={() => setSelectColor(color.name_color)}
                        >
                          {color.name_color}
                        </span>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          )}
          {dataCard && dataCard?.sizes.length > 0 && (
            <div className="flex gap-2 mt-4">
              <p>Sizes:</p>
              <ul className="flex gap-3">
                {dataCard.sizes.map((size, index) => {
                  return (
                    size.size !== undefined && (
                      <li className="cursor-pointer shadow-snipped" key={index}>
                        <span
                          className={`text-sm  px-2 py-[2px] rounded-xl font-medium hover:bg-custom-grayTwo ease-in-out duration-300 hover:text-custom-pink hover:border-custom-pink  ${
                            selectSize === size.size
                              ? "bg-custom-grayTwo text-custom-pink border-custom-pink border-[1px] border-solid"
                              : "border-[1px] border-solid bg-custom-grayThree"
                          }`}
                          onClick={() => setSelectSize(size.size)}
                        >
                          {size.size}
                        </span>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          )}

          {dataCard?.quantidy && (
            <div className="flex gap-3 mt-4 items-center">
              <p>Qtd:</p>
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
                    xmlns="http://www.w3.org/2000/svg"
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
                  id="counter-input"
                  data-input-counter
                  onChange={handleInputChange}
                  className="flex-shrink-0 -mx-1 text-custom-pink font-extrabold dark:text-white border-0 bg-transparent text-lg focus:outline-none focus:ring-0 max-w-[3.5rem] text-center"
                  placeholder=""
                  value={qtd}
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="counter-input"
                  className="flex-shrink-0 bg-custom-grayTwo shadow-snipped hover:bg-custom-grayOne duration-300 ease-linear inline-flex items-center justify-center border border-custom-pink h-7 w-7 focus:ring-custom-pink dark:focus:ring-gray-700 focus:ring-1 focus:outline-none rounded-full"
                  onClick={() =>
                    setQtd(qtd < dataCard?.quantidy ? qtd + 1 : qtd)
                  }
                >
                  <svg
                    className="w-3.5 h-3.5 text-custom-pink dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
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
          )}

          <div className="flex w-full mt-2 gap-3">
            <button className="w-full rounded-md py-2.5 border-solid border-custom-pink border-2 duration-300 ease-linear bg-custom-pink/50 text-xl hover:bg-custom-pink shadow-snipped">
              BUY NOW
            </button>
            <button className="px-[15px] text-2xl rounded-md duration-300 ease-linear hover:bg-custom-pink/50 shadow-snipped">
              <BsShare />
            </button>
          </div>
          <div className="flex w-full mt-2 gap-3">
            <button
              className="shadow-snipped min-w-[89%] rounded-md py-2.5 border-solid border-custom-grayThree border-2 duration-300 ease-linear shadow-const first = useRef(second)ed text-xl hover:bg-custom-grayThree"
              onClick={handleAddItem}
            >
              ADD CART
            </button>
            <button className="w-full px-[7px] text-2xl relative rounded-md duration-300 ease-linear hover:bg-custom-grayThree/50 shadow-snipped">
              <span
                className={`heart ${heart ? "heartActived" : ""}`}
                onClick={() => setHeart(!heart)}
              ></span>
            </button>
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" className="mt-12" />
      <Accordion allowMultiple className="flex flex-col gap-5 mt-8">
        <AccordionItem className="border-none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="text-xl">
                Summary
              </Box>
              <AccordionIcon
                color={"#ed145b"}
                marginRight={"-10px"}
                fontSize={"40px"}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="text-custom-textColor/70">{dataCard?.summary}</AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="text-xl">
                Details
              </Box>
              <AccordionIcon
                color={"#ed145b"}
                marginRight={"-10px"}
                fontSize={"40px"}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ol className="list-disc pl-6 flex flex-col gap-4 text-custom-textColor/70">
              {dataCard?.details.map(
                (detail, index) =>
                  detail &&
                  detail.detail.trim() !== "" && (
                    <li key={index}>{detail.detail}</li>
                  )
              )}
            </ol>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default Page;
