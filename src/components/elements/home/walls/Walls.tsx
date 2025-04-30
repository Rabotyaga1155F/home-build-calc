"use client";

import { useCalculationStore } from "@/store/calculation";

export const walls = [
  { id: 1, label: "Кирпич", basePrice: 15781 },
  { id: 2, label: "Лёгкий бетон", basePrice: 7253 },
  { id: 3, label: "Дерево", basePrice: 11433 },
  { id: 4, label: "Каркас", basePrice: 5733 },
];

export default function Walls() {
  const { setWallType, setWallPrice, length, width, wallType } =
    useCalculationStore();

  const totalArea = length * width;

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * totalArea);
  };

  const handleFoundationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWall = walls.find((f) => f.label === e.target.value);
    if (selectedWall) {
      setWallType(selectedWall.label);
      setWallPrice(getPrice(selectedWall.basePrice));
    }
  };

  const hasSelectedFoundation = !!wallType;

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
          3
        </div>
        <h2 className="pl-5">Стены</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Материал стен</h3>
        <div className="flex flex-col gap-4">
          {walls.map((wall) => (
            <label
              key={wall.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="wallType"
                  value={wall.label}
                  checked={wallType === wall.label}
                  onChange={handleFoundationChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{wall.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(wall.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
