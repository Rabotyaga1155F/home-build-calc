"use client";

import { regions } from "@/data/regions";
import { useCalculationStore } from "@/store/calculation";

export const engineeringServices = [
  { id: 1, label: "Услуги по обустройству электрики", basePrice: 39753 },
  { id: 2, label: "Услуги по обеспечению водоснабжения", basePrice: 12421 },
  { id: 3, label: "Услуги по обеспечению канализацией", basePrice: 18471 },
  { id: 4, label: "Услуги по обеспечению отоплением", basePrice: 82940 },
  {
    id: 5,
    label: "Услуги по вентиляции и кондиционированию",
    basePrice: 30718,
  },
];

export default function Engineering() {
  const region = useCalculationStore((state) => state.region);
  const selectedServices = useCalculationStore(
    (state) => state.selectedEngineeringServices,
  );
  const addService = useCalculationStore(
    (state) => state.addEngineeringService,
  );
  const removeService = useCalculationStore(
    (state) => state.removeEngineeringService,
  );

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
          7
        </div>
        <h2 className="pl-5">Подготовительные работы</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Услуги инженерии</h3>

        <div className="flex flex-col gap-4">
          {engineeringServices.map((service) => (
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
