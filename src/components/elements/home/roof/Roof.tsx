"use client";

import { useCalculationStore } from "@/store/calculation";

export const roofs = [
  { id: 1, label: "Металлочерепица", basePrice: 7481 },
  { id: 2, label: "Гибкая черепица", basePrice: 4753 },
  { id: 3, label: "Рулонные материалы", basePrice: 4733 },
  { id: 4, label: "Ондулин", basePrice: 5433 },
  { id: 5, label: "Профнастил", basePrice: 7733 },
];

export default function Roof() {
  const { setRoofType, setRoofPrice, length, width, roofType } =
    useCalculationStore();

  const totalArea = length * width;

  const getPrice = (basePrice: number) => {
    return Math.round((basePrice * totalArea) / 1.5);
  };

  const handleRoofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRoof = roofs.find((f) => f.label === e.target.value);
    if (selectedRoof) {
      setRoofType(selectedRoof.label);
      setRoofPrice(getPrice(selectedRoof.basePrice));
    }
  };

  const hasSelectedFoundation = !!roofType;

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
          4
        </div>
        <h2 className="pl-5">Кровля</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Вид кровли</h3>
        <div className="flex flex-col gap-4">
          {roofs.map((roof) => (
            <label
              key={roof.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="roofType"
                  value={roof.label}
                  checked={roofType === roof.label}
                  onChange={handleRoofChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{roof.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(roof.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
