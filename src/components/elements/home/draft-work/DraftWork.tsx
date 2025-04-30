"use client";

import { useCalculationStore } from "@/store/calculation";

export const drafts = [
  { id: 1, label: "Дерево", basePrice: 39058 },
  { id: 2, label: "Бетон", basePrice: 45134 },
  { id: 3, label: "Металл", basePrice: 24908 },
];

export default function DraftWork() {
  const { setDraftType, setDraftPrice, floors, draftType } =
    useCalculationStore();

  const getPrice = (basePrice: number) => {
    return Math.round(basePrice * Number(floors));
  };

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDraft = drafts.find((f) => f.label === e.target.value);
    if (selectedDraft) {
      setDraftType(selectedDraft.label);
      setDraftPrice(getPrice(selectedDraft.basePrice));
    }
  };

  const hasSelectedFoundation = !!draftType;

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
          8
        </div>
        <h2 className="pl-5">Внутренние черновые работы</h2>
      </div>

      <div className="mt-7">
        <h3 className="font-medium mb-4">Материал лестниц</h3>
        <div className="flex flex-col gap-4">
          {drafts.map((draft) => (
            <label
              key={draft.id}
              className="flex items-center justify-between py-0.5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="draftType"
                  value={draft.label}
                  checked={draftType === draft.label}
                  onChange={handleDraftChange}
                  className="w-5 h-5"
                />
                <span className={"text-sm"}>{draft.label}</span>
              </div>
              <div className="font-medium text-sm">
                {getPrice(draft.basePrice)} ₽
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
