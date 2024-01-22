import NavbarHome from "@/app/components/navbarHome/navbarHome";
import SearchInput from "@/app/components/ui/searchInput";
import Image from "next/image";
import React, { Suspense } from "react";
import Model1 from "@/app/assets/model1.webp";
import Model2 from "@/app/assets/model2.webp";
import Model3 from "@/app/assets/model3.webp";
import Model4 from "@/app/assets/model4.webp";
import CarrosselShop from "@/app/components/ui/carrosel/carrosselShop";

function Shop() {
  return (
    <main className="flex min-h-screen max-w-[1050px] w-full px-10 flex-col items-center mt-24 max-md:mx-8">
      <aside className="flex w-full justify-center mt-4 md:hidden">
        <SearchInput classname="min-md:hidden w-full" />
      </aside>
      <NavbarHome />
      <section className="w-full flex h-96 gap-6 mt-4 max-md:hidden font-thin-inter font-in">
        {" "}
        <div className="shadow-snipped bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear overflow-x-hidden">
          <Image
            alt="Model2"
            src={Model2}
            className="w-full  h-full object-cover"
          />
          <span className="writing w-[17%] group-hover:w-0 tracking-widest duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 flex items-center justify-center">
            Masculine
          </span>
        </div>{" "}
        <div className="w-1/2 h-full flex flex-col gap-6">
          <div className="shadow-snipped h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
            <Image
              alt="Model3"
              src={Model3}
              className="w-full h-full object-cover"
            />
            <span className="text-[22px] h-[26%] group-hover:h-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center">
              Chieldren's
            </span>
          </div>{" "}
          <div className="shadow-snipped h-1/2 bg-custom-grayTwo text-custom-textColor w-full flex flex-col items-center uppercase group duration-300 transition-all ease-linear overflow-hidden">
            <Image
              alt="Model4"
              src={Model4}
              className="w-full h-full object-cover"
            />
            <span className="text-[22px] h-[26%] group-hover:h-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center">
              Chieldren's
            </span>
          </div>{" "}
        </div>
        <div className="shadow-snipped bg-custom-grayTwo text-custom-textColor w-1/4 flex items-center uppercase group duration-300 transition-all ease-linear">
          <span className="writing w-[20%] group-hover:w-0 duration-300 transition-all ease-linear group-hover:text-custom-textColor/0 overflow-x-hidden tracking-[0.2em] flex items-center justify-center">
            Feminine
          </span>
          <Image
            alt="Model1"
            src={Model1}
            className="w-full  h-full object-cover"
          />
        </div>{" "}
      </section>
          <CarrosselShop query="order_by=created_at:desc" category="NEWS" />

          <CarrosselShop query="categoria=moda-fitness" category="FITNESS FASHION" />
    </main>
  );
}

export default Shop;
