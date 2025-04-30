"use client";

import { regions } from "@/data/regions";
import { useCalculationStore } from "@/store/calculation";

export const services = [
  { id: 1, label: "Подбор участка", basePrice: 7153 },
  { id: 2, label: "Геодезические работы", basePrice: 8321 },
  { id: 3, label: "Геологические работы", basePrice: 27471 },
  { id: 4, label: "Подготовка участка", basePrice: 29940 },
  { id: 5, label: "Камеры видеонаблюдения", basePrice: 3218 },
  { id: 6, label: "Устройство временного забора", basePrice: 200199 },
  { id: 7, label: "Проект дома", basePrice: 29821 },
  { id: 8, label: "Дизайн-проект", basePrice: 90412 },
];

export default function PreparatoryWork() {
  const region = useCalculationStore((state) => state.region);
  const selectedServices = useCalculationStore(
    (state) => state.selectedServices,
  );
  const addService = useCalculationStore((state) => state.addService);
  const removeService = useCalculationStore((state) => state.removeService);

  const getPrice = (basePrice: number) => {
    const coefficient = region
      ? regions.find((r) => r.value === region.value)?.coefficient || 1
      : 1;
    return Math.round(basePrice * coefficient);
  };

  const isSelected = (id: number) => {
    return selectedServices.some((service) => service.id === id);
  };

  const handleServiceToggle = (
    id: number,
    label: string,
    basePrice: number,
  ) => {
    const price = getPrice(basePrice);
    if (isSelected(id)) {
      removeService(id);
    } else {
      addService({ id, label, price });
    }
  };

  const hasSelectedServices = selectedServices.length > 0;

  return (
    <div className="bg-white p-8 rounded-2xl mt-5">
      <div className="flex flex-row items-center">
        <div
          className={`w-12 h-12 border flex items-center justify-center rounded-full text-lg ${
            hasSelectedServices
              ? "bg-[#4174B9] text-white border-[#4174B9]"
              : "border-gray-300"
          }`}
        >
          1
        </div>
        <h2 className="pl-5">Подготовительные работы</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Подбор и подготовка участка</h3>

        <div className="flex flex-col gap-4">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected(service.id)}
                  onChange={() =>
                    handleServiceToggle(
                      service.id,
                      service.label,
                      service.basePrice,
                    )
                  }
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{service.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(service.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
