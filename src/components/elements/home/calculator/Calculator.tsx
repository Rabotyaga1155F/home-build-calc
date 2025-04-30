"use client";

import { useCalculationStore } from "@/store/calculation";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Calculator() {
  const {
    region,
    floors,
    length,
    width,
    squareLand,
    selectedServices,
    selectedEngineeringServices,
    foundationPrice,
    wallPrice,
    roofPrice,
    facadePrice,
    facadeType,
    windowPrice,
    doorPrice,
    draftPrice,
    ceilingCoveringPrice,
    wallDecorationPrice,
    floorCoveringPrice,
  } = useCalculationStore();

  const router = useRouter();

  const windowsAndDoorsPrice = useMemo(() => {
    return (windowPrice || 0) + (doorPrice || 0);
  }, [windowPrice, doorPrice]);

  const finishingWorksPrice = useMemo(() => {
    return (
      (floorCoveringPrice || 0) +
      (wallDecorationPrice || 0) +
      (ceilingCoveringPrice || 0)
    );
  }, [floorCoveringPrice, wallDecorationPrice, ceilingCoveringPrice]);

  const isFormValid = useMemo(() => {
    return (
      region &&
      floors &&
      length &&
      width &&
      squareLand &&
      selectedServices[0] &&
      foundationPrice &&
      wallPrice &&
      roofPrice &&
      facadeType &&
      windowsAndDoorsPrice &&
      selectedEngineeringServices[0] &&
      draftPrice &&
      finishingWorksPrice
    );
  }, [
    region,
    floors,
    length,
    width,
    squareLand,
    selectedServices,
    foundationPrice,
    wallPrice,
    roofPrice,
    facadeType,
    windowsAndDoorsPrice,
    selectedEngineeringServices,
    draftPrice,
    finishingWorksPrice,
  ]);

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

  useEffect(() => {
    const {
      recalculateFoundationPrice,
      recalculateWallPrice,
      recalculateRoofPrice,
      recalculateFacadePrice,
      recalculateDoorPrice,
      recalculateWindowPrice,
      recalculateDraftPrice,
      recalculateFloorCoveringPrice,
      recalculateWallDecorationPrice,
      recalculateCeilingCoveringPrice,
    } = useCalculationStore.getState();
    recalculateFoundationPrice();
    recalculateWallPrice();
    recalculateRoofPrice();
    recalculateFacadePrice();
    recalculateWindowPrice();
    recalculateDoorPrice();
    recalculateDraftPrice();
    recalculateFloorCoveringPrice();
    recalculateCeilingCoveringPrice();
    recalculateWallDecorationPrice();
  }, [length, width, floors]);

  return (
    <div className="bg-white mt-5 lg:mt-0 lg:ml-5 p-8 rounded-2xl">
      <h3 className="text-2xl font-medium mb-4">Сведения о доме</h3>
      <p className="text-sm text-gray-700 mb-4">
        В расчёт стоимости входит материалы и оценка объёмов работ
      </p>

      <div>
        {region && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Регион:</span>
            <span>{region.label}</span>
          </p>
        )}
        {floors && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Этажность:</span>
            <span>{floors}</span>
          </p>
        )}
        {length && width && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Размеры дома:</span>
            <span>{`${length * width} м²`}</span>
          </p>
        )}
        {squareLand && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Площадь участка:</span>
            <span>{squareLand} соток</span>
          </p>
        )}

        {selectedServices.length > 0 && (
          <div className="mt-5">
            <h4 className="font-medium text-md mb-2">
              Подготовительные работы:
            </h4>
            <ul className="flex flex-col gap-2">
              {selectedServices.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between text-sm text-black"
                >
                  <span>{service.label}</span>
                  <span>{service.price} ₽</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-2">
        {foundationPrice !== null && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Фундамент:</span>
            <span>{foundationPrice.toLocaleString()} ₽</span>
          </p>
        )}
      </div>

      <div className="mt-1">
        {wallPrice !== null && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Стены:</span>
            <span>{wallPrice.toLocaleString()} ₽</span>
          </p>
        )}
      </div>
      <div className="mt-1">
        {roofPrice !== null && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Кровля:</span>
            <span>{roofPrice.toLocaleString()} ₽</span>
          </p>
        )}
      </div>

      <div className="mt-1">
        {facadePrice !== null && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">Фасад:</span>
            <span>{facadePrice.toLocaleString()} ₽</span>
          </p>
        )}
      </div>

      <div className="mt-1">
        {(windowPrice !== null || doorPrice !== null) &&
          windowsAndDoorsPrice > 0 && (
            <p className="text-sm text-black flex justify-between py-1">
              <span className="text-sm text-gray-700">Двери и окна:</span>
              <span>{windowsAndDoorsPrice.toLocaleString()} ₽</span>
            </p>
          )}
      </div>

      {selectedEngineeringServices.length > 0 && (
        <div className="mt-5">
          <h4 className="font-medium text-md mb-2">Инженерные коммуникации:</h4>
          <ul className="flex flex-col gap-2">
            {selectedEngineeringServices.map((service) => (
              <li
                key={service.id}
                className="flex justify-between text-sm text-black"
              >
                <span>{service.label}</span>
                <span>{service.price} ₽</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-1">
        {draftPrice !== null && (
          <p className="text-sm text-black flex justify-between py-1">
            <span className="text-sm text-gray-700">
              Внутренние черновые работы:
            </span>
            <span>{draftPrice.toLocaleString()} ₽</span>
          </p>
        )}
      </div>

      <div className="mt-1">
        {(floorCoveringPrice !== null ||
          wallDecorationPrice !== null ||
          ceilingCoveringPrice !== null) &&
          finishingWorksPrice > 0 && (
            <p className="text-sm text-black flex justify-between py-1">
              <span className="text-sm text-gray-700">
                Внутренние чистовые отделочные работы:
              </span>
              <span>{finishingWorksPrice.toLocaleString()} ₽</span>
            </p>
          )}
      </div>

      <div className="flex flex-row justify-between items-center py-4">
        <h3 className="font-bold text-xl">Итого</h3>
        <h3 className="font-bold text-xl">{totalPrice.toLocaleString()}₽</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">Оценка затрат предварительна</p>

      <button
        onClick={() => router.replace("/print")}
        disabled={!isFormValid}
        className={`w-full py-3 rounded-lg text-white font-semibold text-center ${
          isFormValid
            ? "bg-[#4174B9] hover:bg-[#365a8e] cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Подать заявку
      </button>
    </div>
  );
}
