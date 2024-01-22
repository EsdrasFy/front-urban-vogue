import Link from "next/link";
import React from "react";

function NavbarHome() {
  return (
    <nav className="w-full mt-8 text-custom-textColor max-md:hidden font-light">
      <ul className="flex w-full gap-1 justify-between text-2xl border-custom-pink font-extralight">
        <li className="relative">
          <Link href={"#"} className="bordernav max-lg:hidden">
            SHIRTS
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav">
            BRANDS
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav">
            PANTS
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav">
            BEACH
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav">
            SHOES
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav max-lg:hidden">
            PERFUME
          </Link>
        </li>
        <li className="relative">
          <Link href={"#"} className="bordernav">
            RELEASES
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarHome;
