"use client";

import { useCalculationStore } from "@/store/calculation";

export const walllDecoration = [
  {
    id: 1,
    label: "Декоративная штукатурка",
    basePrice: 852,
  },
  {
    id: 2,
    label: "Покраска",
    basePrice: 931,
  },
  {
    id: 3,
    label: "Обои",
    basePrice: 1376,
  },
  { id: 4, label: "Плитка", basePrice: 3598 },
];

export const floorrrCovering = [
  { id: 1, label: "Ламинат", basePrice: 3990 },
  { id: 2, label: "Линолеум", basePrice: 2997 },
];

export const ceilingggCovering = [
  { id: 1, label: "Натяжной потолок", basePrice: 351 },
  { id: 2, label: "Окраска", basePrice: 2094 },
  { id: 3, label: "Обои", basePrice: 1723 },
  { id: 4, label: "Штукатурка", basePrice: 851 },
];

export default function FinishingWork() {
  const {
    setWallDecorationType,
    setWallDecorationPrice,
    setFloorCoveringType,
    setFloorCoveringPrice,
    setCeilingCoveringType,
    setCeilingCoveringPrice,
    length,
    width,
    wallDecorationType,
    floorCoveringType,
    ceilingCoveringType,
  } = useCalculationStore();

  const totalArea = length * width;

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * totalArea);
  };

  const handleWallDecorationsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedWallDecoration = walllDecoration.find(
      (f) => f.label === e.target.value,
    );
    if (selectedWallDecoration) {
      setWallDecorationType(selectedWallDecoration.label);
      setWallDecorationPrice(getPrice(selectedWallDecoration.basePrice));
    }
  };

  const handleFloorCoveringsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFloorCovering = floorrrCovering.find(
      (f) => f.label === e.target.value,
    );
    if (selectedFloorCovering) {
      setFloorCoveringType(selectedFloorCovering.label);
      setFloorCoveringPrice(getPrice(selectedFloorCovering.basePrice));
    }
  };

  const handleCeilingCoveringsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedCeilingCovering = ceilingggCovering.find(
      (f) => f.label === e.target.value,
    );
    if (selectedCeilingCovering) {
      setCeilingCoveringType(selectedCeilingCovering.label);
      setCeilingCoveringPrice(getPrice(selectedCeilingCovering.basePrice));
    }
  };

  const hasSelectedOpenings =
    !!wallDecorationType || !!floorCoveringType || !!ceilingCoveringType;

  return (
    <div className="bg-white p-8 rounded-2xl mt-5">
      <div className="flex flex-row items-center">
        <div
          className={`w-12 h-12 border flex items-center justify-center rounded-full text-lg ${
            hasSelectedOpenings
              ? "bg-[#4174B9] text-white border-[#4174B9]"
              : "border-gray-300"
          }`}
        >
          9
        </div>
        <h2 className="pl-5">Внутренние чистовые отделочные работы</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Отделка стен</h3>
        <div className="flex flex-col gap-4">
          {walllDecoration.map((wallDecoration) => (
            <label
              key={wallDecoration.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="wallDecorationType"
                  value={wallDecoration.label}
                  checked={wallDecorationType === wallDecoration.label}
                  onChange={handleWallDecorationsChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{wallDecoration.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(wallDecoration.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>

        <h3 className="font-medium my-4">Покрытие пола</h3>
        <div className="flex flex-col gap-4">
          {floorrrCovering.map((floorCovering) => (
            <label
              key={floorCovering.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="floorCoveringType"
                  value={floorCovering.label}
                  checked={floorCoveringType === floorCovering.label}
                  onChange={handleFloorCoveringsChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{floorCovering.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(floorCovering.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>

        <h3 className="font-medium my-4">Покрытие потолка</h3>
        <div className="flex flex-col gap-4">
          {ceilingggCovering.map((ceilingCovering) => (
            <label
              key={ceilingCovering.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="ceilingCoveringType"
                  value={ceilingCovering.label}
                  checked={ceilingCoveringType === ceilingCovering.label}
                  onChange={handleCeilingCoveringsChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{ceilingCovering.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(ceilingCovering.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
