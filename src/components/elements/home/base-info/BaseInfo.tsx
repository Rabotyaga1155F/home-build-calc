"use client";
import Select from "react-select";
import { regions } from "@/data/regions";
import { useCalculationStore } from "@/store/calculation";

const floors = [
  { value: "1", label: "1 этаж" },
  { value: "2", label: "2 этажа" },
  { value: "3", label: "3 этажа" },
];

export default function BaseInfo() {
  const {
    setRegion,
    setFloors,
    setLength,
    setWidth,
    setSquareLand,
    length,
    width,
    squareLand,
  } = useCalculationStore();

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLength = Number(e.target.value);
    if (isNaN(newLength)) return;

    if (newLength <= 0) newLength = 1;
    if (newLength > 99) newLength = 99;

    setLength(newLength);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newWidth = Number(e.target.value);
    if (isNaN(newWidth)) return;

    if (newWidth <= 0) newWidth = 1;
    if (newWidth > 99) newWidth = 99;

    setWidth(newWidth);
  };

  const handleSquareLandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSquareLand = Number(e.target.value);
    if (isNaN(newSquareLand)) return;

    if (newSquareLand < 0) newSquareLand = 0;
    if (newSquareLand > 999) newSquareLand = 999;

    setSquareLand(newSquareLand);
  };

  const area = length * width;

  return (
    <div className="bg-white p-8 rounded-2xl">
      <h3 className="text-xl font-medium mb-4">Регион</h3>
      <Select
        options={regions}
        defaultValue={{ value: "moskva", label: "Москва", coefficient: 1.5 }}
        onChange={(selected) => setRegion(selected)}
        placeholder="Выберите регион"
        className="text-black"
        classNamePrefix="react-select"
      />

      <h3 className="text-xl font-medium mb-4 mt-10">Количество этажей</h3>
      <Select
        options={floors}
        defaultValue={{ value: "1", label: "1 этаж" }}
        onChange={(selected) => setFloors(selected!.value)}
        placeholder="Этажность дома"
        className="text-black"
        classNamePrefix="react-select"
      />

      <h3 className="text-xl font-medium mb-4 mt-10">Площадь дома</h3>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="number"
            value={length}
            onChange={handleLengthChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            min="1"
            max="99"
          />
          <span className="flex items-center">x</span>
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            min="1"
            max="99"
          />
        </div>
        <input
          type="text"
          value={`${area} м²`}
          readOnly
          className="border border-gray-300 rounded-lg px-4 py-2 w-28 text-center"
        />
      </div>

      <h3 className="text-xl font-medium mb-4 mt-10">Площадь участка</h3>
      <input
        type="number"
        value={squareLand !== null ? squareLand : 10}
        onChange={handleSquareLandChange}
        placeholder="Сотки"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        min="0"
        max="999"
      />
    </div>
  );
}
