"use client";

import { useCalculationStore } from "@/store/calculation";
import { useEffect } from "react";

export const windows = [
  {
    id: 1,
    label: "Проемы. Окна (Деревянные, однокамерные)",
    basePrice: 145464,
  },
  {
    id: 2,
    label: "Проемы. Окна (Деревянные, двухкамерные)",
    basePrice: 177784,
  },
  {
    id: 3,
    label: "Проемы. Окна (Деревянные, трехкамерные)",
    basePrice: 207903,
  },
  { id: 4, label: "Проемы. Окна (ПВХ, однокамерные)", basePrice: 143984 },
  { id: 5, label: "Проемы. Окна (ПВХ, двухкамерные)", basePrice: 176494 },
  { id: 6, label: "Проемы. Окна (ПВХ, трехкамерные)", basePrice: 203617 },
];

export const doors = [
  { id: 1, label: "Деревянные", basePrice: 81503 },
  { id: 2, label: "Пластиковые", basePrice: 80696 },
];

export default function Openings() {
  const {
    setDoorsType,
    setDoorsPrice,
    setWindowsType,
    setWindowsPrice,
    floors,
    doorType,
    windowType,
  } = useCalculationStore();

  useEffect(() => {
    console.log(floors);
  }, [floors]);

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * Number(floors));
  };

  const handleDoorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDoor = doors.find((f) => f.label === e.target.value);
    if (selectedDoor) {
      setDoorsType(selectedDoor.label);
      setDoorsPrice(getPrice(selectedDoor.basePrice));
    }
  };

  const handleWindowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWindow = windows.find((f) => f.label === e.target.value);
    if (selectedWindow) {
      setWindowsType(selectedWindow.label);
      setWindowsPrice(getPrice(selectedWindow.basePrice));
    }
  };

  const hasSelectedOpenings = !!windowType || !!doorType;

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
          6
        </div>
        <h2 className="pl-5">Двери и окна</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Тип окон</h3>
        <div className="flex flex-col gap-4">
          {windows.map((window) => (
            <label
              key={window.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="windowType"
                  value={window.label}
                  checked={windowType === window.label}
                  onChange={handleWindowsChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{window.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(window.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>

        <h3 className="font-medium my-4">Материал дверей</h3>
        <div className="flex flex-col gap-4">
          {doors.map((door) => (
            <label
              key={door.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="doorType"
                  value={door.label}
                  checked={doorType === door.label}
                  onChange={handleDoorsChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{door.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(door.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
