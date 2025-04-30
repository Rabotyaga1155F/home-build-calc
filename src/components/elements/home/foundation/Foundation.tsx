"use client";

import { useCalculationStore } from "@/store/calculation";

export const foundations = [
  { id: 1, label: "Свайный", basePrice: 2151 },
  { id: 2, label: "Столбчатый", basePrice: 1021 },
  { id: 3, label: "Ленточный", basePrice: 5471 },
  { id: 4, label: "Плитный", basePrice: 10940 },
];

export default function Foundation() {
  const {
    setFoundationType,
    setFoundationPrice,
    length,
    width,
    foundationType,
  } = useCalculationStore();

  const totalArea = length * width;

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * totalArea);
  };

  const handleFoundationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFoundation = foundations.find(
      (f) => f.label === e.target.value,
    );
    if (selectedFoundation) {
      setFoundationType(selectedFoundation.label);
      setFoundationPrice(getPrice(selectedFoundation.basePrice));
    }
  };

  const hasSelectedFoundation = !!foundationType;

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
          2
        </div>
        <h2 className="pl-5">Фундамент</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Тип фундамента</h3>
        <div className="flex flex-col gap-4">
          {foundations.map((foundation) => (
            <label
              key={foundation.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="foundationType"
                  value={foundation.label}
                  checked={foundationType === foundation.label}
                  onChange={handleFoundationChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{foundation.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(foundation.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
