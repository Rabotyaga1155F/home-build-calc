"use client";

import { useCalculationStore } from "@/store/calculation";

export const facades = [
  { id: 1, label: "Без отделки", basePrice: 0 },
  { id: 2, label: "Панели (сайдинг)", basePrice: 5253 },
  { id: 3, label: "Облицовка кирпичом", basePrice: 2654 },
  { id: 4, label: "Искуственный камень", basePrice: 5047 },
];

export default function Facade() {
  const { setFacadeType, setFacadePrice, length, width, facadeType } =
    useCalculationStore();

  const totalArea = length * width;

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * totalArea);
  };

  const handleFacadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFacade = facades.find((f) => f.label === e.target.value);
    if (selectedFacade) {
      setFacadeType(selectedFacade.label);
      setFacadePrice(getPrice(selectedFacade.basePrice));
    }
  };

  const hasSelectedFoundation = !!facadeType;

  return (
    <div className="bg-white p-8 rounded-2xl mt-5">
      <div className="flex flex-row items-center">
        <div
          className={`w-12 h-12 border flex items-center justify-center rounded-full text-lg ${
            hasSelectedFoundation
              ? "bg-[#4174B9] text-white border-[#4174B9]"
              : "border-gray-300"
          }`}
        >
          5
        </div>
        <h2 className="pl-5">Фасад</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Технология фасада</h3>
        <div className="flex flex-col gap-4">
          {facades.map((facade) => (
            <label
              key={facade.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="facadeType"
                  value={facade.label}
                  checked={facadeType === facade.label}
                  onChange={handleFacadeChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{facade.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(facade.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
