"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={"flex items-center justify-between h-24 p-0 lg:px-24 px-6 "}
    >
      <div className={"flex flex-row justify-center items-center"}>
        <Image width={70} height={70} src={"/logo.jpg"} alt={"logo"} />
        <h1 className={"font-bold text-2xl text-[#4174B9]"}>КАТ</h1>
        <h1 className={"font-bold text-2xl text-[#D95563]"}>РИН</h1>
      </div>
      <Link
        href="/#calculator-section"
        onClick={(e) => handleScroll(e, "#calculator-section")}
        scroll={false}
      >
        <button
          className={
            "font-medium border border-gray-300 px-4 h-13 rounded-2xl cursor-pointer"
          }
        >
          Подать заявку
        </button>
      </Link>
    </header>
  );
}
