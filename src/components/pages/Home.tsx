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

export default function HomePage() {
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
    </div>
  );
}
