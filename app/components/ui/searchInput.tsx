"use client"
import React from 'react'
import { HiSearch } from "react-icons/hi";
import { MdKeyboardVoice } from "react-icons/md";


type SearchInputProps = {
  classname: string;
}

function SearchInput({classname}:SearchInputProps) {
  return (
    <form className={`relative ${classname}`}>
    <div className={`relative w-full`}>
      <input
        type="search"
        className={`relative bg-custom-grayThree rounded-3xl py-[3px] pl-16 text-white duration-200 transition-all ease-linear hover:opacity-70 w-full outline-none searchInput text-lg max-[400px]:pl-12 `}
        placeholder="ex: Camisa"
        />
      <button className="absolute right-3 z-10 top-[50%] translate-y-[-50%] text-white text-2xl duration-200 transition-all ease-linear hover:text-custom-pink max-md:text-2xl ">
        <MdKeyboardVoice />
      </button>
      <button
        type="submit"
        className="absolute left-0 top-0 bg-white text-grayOnerounded-full duration-200 transition-all ease-linear hover:opacity-90 z-10 p-[6px] text-2xl rounded-full"
        >
        <HiSearch />
      </button>
    </div>
  </form>
  )
}

export default SearchInput;
