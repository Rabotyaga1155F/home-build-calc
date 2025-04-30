"use client";

import BaseInfo from "@/components/elements/home/base-info/BaseInfo";
import Calculator from "@/components/elements/home/calculator/Calculator";
import PreparatoryWork from "@/components/elements/home/preparatory-work/PreparatoryWork";
import Foundation from "@/components/elements/home/foundation/Foundation";
import Walls from "@/components/elements/home/walls/Walls";
import Roof from "@/components/elements/home/roof/Roof";
import Facade from "@/components/elements/home/facade/Facade";
import Openings from "@/components/elements/home/openings/Openings";
import Engineering from "@/components/elements/home/engineering/Engineering";
import DraftWork from "@/components/elements/home/draft-work/DraftWork";
import FinishingWork from "@/components/elements/home/finishing-work/FinishingWork";
import Image from "next/image";

export default function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pb-20">
      <div id="calculator-section" className="pt-20">
        <h1 className="font-medium text-3xl mb-8">
          Подробный калькулятор строительства
        </h1>

        <div className="flex flex-col lg:flex-row relative">
          <div className="w-full lg:w-[53%]">
            <BaseInfo />
            <PreparatoryWork />
            <Foundation />
            <Walls />
            <Roof />
            <Facade />
            <Openings />
            <Engineering />
            <DraftWork />
            <FinishingWork />
          </div>

          <div className="lg:w-[47%] w-full lg:sticky lg:top-24">
            <Calculator />
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 cursor-pointer right-6 h-14 w-14 bg-[#4174B9] rounded-full flex flex-row justify-center items-center shadow-lg hover:bg-[#3a6aa8] transition-colors duration-200 z-50"
        aria-label="Scroll to top"
      >
        <Image
          width={25}
          height={25}
          src={"/arrowhead-up.svg"}
          alt={"Scroll to top"}
        />
      </button>
    </div>
  );
}
