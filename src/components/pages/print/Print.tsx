"use client";

import { useCalculationStore } from "@/store/calculation";
import { pdf } from "@react-pdf/renderer";
import MyPdfDocument from "@/components/elements/print/MyPdfDocument";
import { useMemo } from "react";

export default function PrintPage() {
  const {
    region,
    floors,
    length,
    width,
    squareLand,
    selectedServices,
    selectedEngineeringServices,
    foundationType,
    foundationPrice,
    wallType,
    wallPrice,
    doorType,
    doorPrice,
    windowType,
    windowPrice,
    facadeType,
    facadePrice,
    draftType,
    draftPrice,
    roofType,
    roofPrice,
    wallDecorationType,
    wallDecorationPrice,
    ceilingCoveringType,
    ceilingCoveringPrice,
    floorCoveringType,
    floorCoveringPrice,
  } = useCalculationStore();

  const totalPrice = useMemo(() => {
    const serviceTotal = selectedServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    const engineersTotal = selectedEngineeringServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    return (
      serviceTotal +
      engineersTotal +
      (foundationPrice || 0) +
      (wallPrice || 0) +
      (roofPrice || 0) +
      (facadePrice || 0) +
      (windowPrice || 0) +
      (ceilingCoveringPrice || 0) +
      (wallDecorationPrice || 0) +
      (floorCoveringPrice || 0) +
      (draftPrice || 0) +
      (doorPrice || 0)
    );
  }, [
    selectedServices,
    selectedEngineeringServices,
    foundationPrice,
    wallPrice,
    roofPrice,
    draftPrice,
    facadePrice,
    windowPrice,
    doorPrice,
    floorCoveringPrice,
    wallDecorationPrice,
    ceilingCoveringPrice,
  ]);

  const handleDownload = async () => {
    const blob = await pdf(<MyPdfDocument />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "order.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-20 pt-8">
      <div className="p-6 py-12 max-w-4xl mx-auto space-y-6 bg-white text-gray-800 rounded-2xl">
        <h1 className="text-2xl font-bold text-center">Информация о доме</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">Общие параметры</h2>
          <ul className="space-y-1">
            <li>Регион: {region?.label}</li>
            <li>Количество этажей: {floors}</li>
            <li>Длина: {length} м</li>
            <li>Ширина: {width} м</li>
            <li>Площадь участка: {squareLand} соток</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Подготовительные работы
          </h2>
          <ul className="space-y-1">
            {selectedServices.length === 0 ? (
              <li>Не выбраны</li>
            ) : (
              selectedServices.map((s) => (
                <li key={s.id}>
                  {s.label} — {s.price} ₽
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Инженерные системы</h2>
          <ul className="space-y-1">
            {selectedEngineeringServices.length === 0 ? (
              <li>Не выбраны</li>
            ) : (
              selectedEngineeringServices.map((s) => (
                <li key={s.id}>
                  {s.label} — {s.price} ₽
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Конструктивные элементы
          </h2>
          <ul className="space-y-1">
            <li>
              Фундамент: {foundationType} — {foundationPrice ?? "Не указана"} ₽
            </li>
            <li>
              Стеновой материал: {wallType} — {wallPrice ?? "Не указана"} ₽
            </li>
            <li>
              Крыша: {roofType} — {roofPrice ?? "Не указана"} ₽
            </li>
            <li>
              Фасад: {facadeType} — {facadePrice ?? "Не указана"} ₽
            </li>
            <li>
              Черновые работы: {draftType} — {draftPrice ?? "Не указана"} ₽
            </li>
            <li>
              Двери: {doorType} — {doorPrice ?? "Не указана"} ₽
            </li>
            <li>
              Окна: {windowType} — {windowPrice ?? "Не указана"} ₽
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Отделочные работы</h2>
          <ul className="space-y-1">
            <li>
              Отделка стен: {wallDecorationType} —{" "}
              {wallDecorationPrice ?? "Не указана"} ₽
            </li>
            <li>
              Покрытие пола: {floorCoveringType} —{" "}
              {floorCoveringPrice ?? "Не указана"} ₽
            </li>
            <li>
              Потолок: {ceilingCoveringType} —{" "}
              {ceilingCoveringPrice ?? "Не указана"} ₽
            </li>
          </ul>
        </section>

        <h3 className="text-2xl font-bold">
          Итого: {totalPrice.toLocaleString()}₽
        </h3>
        <button
          onClick={handleDownload}
          className={`w-full py-3 mt-6 rounded-lg text-white font-semibold text-center bg-[#4174B9] hover:bg-[#365a8e] cursor-pointer`}
        >
          Скачать PDF
        </button>
      </div>
    </div>
  );
}
