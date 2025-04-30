import { create } from "zustand";
import { regions } from "@/data/regions";
import { services } from "@/components/elements/home/preparatory-work/PreparatoryWork";
import { foundations } from "@/components/elements/home/foundation/Foundation";
import { walls } from "@/components/elements/home/walls/Walls";
import { roofs } from "@/components/elements/home/roof/Roof";
import { facades } from "@/components/elements/home/facade/Facade";
import { doors, windows } from "@/components/elements/home/openings/Openings";
import { engineeringServices } from "@/components/elements/home/engineering/Engineering";
import { drafts } from "@/components/elements/home/draft-work/DraftWork";

import {
  floorrrCovering,
  walllDecoration,
} from "@/components/elements/home/finishing-work/FinishingWork";

type Region = { value: string; label: string; coefficient: number } | null;
type Floors = string | null;
type Service = { id: number; label: string; price: number };

type CalculationStore = {
  region: Region;
  floors: Floors;
  length: number;
  width: number;
  squareLand: number | null;
  selectedServices: Service[];
  selectedEngineeringServices: Service[];
  foundationType: string | null;
  foundationPrice: number | null;
  wallType: string | null;
  wallPrice: number | null;
  doorType: string | null;
  doorPrice: number | null;
  windowType: string | null;
  windowPrice: number | null;
  facadeType: string | null;
  facadePrice: number | null;
  draftType: string | null;
  draftPrice: number | null;
  roofType: string | null;
  roofPrice: number | null;
  wallDecorationType: string | null;
  wallDecorationPrice: number | null;
  floorCoveringType: string | null;
  floorCoveringPrice: number | null;
  ceilingCoveringType: string | null;
  ceilingCoveringPrice: number | null;
  totalPrice: number;
  calculateTotalPrice: () => void;

  setRegion: (region: Region) => void;
  setFloors: (floors: Floors) => void;
  setLength: (length: number) => void;
  setWidth: (width: number) => void;
  setSquareLand: (squareLand: number | null) => void;
  setFoundationType: (foundationType: string | null) => void;
  setFoundationPrice: (foundationPrice: number | null) => void;
  setWallType: (wallType: string | null) => void;
  setWallPrice: (wallPrice: number | null) => void;
  setDoorsType: (doorType: string | null) => void;
  setDoorsPrice: (doorPrice: number | null) => void;
  setWindowsType: (windowType: string | null) => void;
  setWindowsPrice: (windowPrice: number | null) => void;
  setFacadeType: (facadeType: string | null) => void;
  setFacadePrice: (facadePrice: number | null) => void;
  setDraftType: (facadeType: string | null) => void;
  setDraftPrice: (facadePrice: number | null) => void;
  setRoofType: (roofType: string | null) => void;
  setRoofPrice: (roofPrice: number | null) => void;
  addService: (service: Service) => void;
  addEngineeringService: (service: Service) => void;
  removeService: (serviceId: number) => void;
  removeEngineeringService: (serviceId: number) => void;
  setWallDecorationType: (doorType: string | null) => void;
  setWallDecorationPrice: (doorPrice: number | null) => void;
  setFloorCoveringType: (windowType: string | null) => void;
  setFloorCoveringPrice: (windowPrice: number | null) => void;
  setCeilingCoveringType: (windowType: string | null) => void;
  setCeilingCoveringPrice: (windowPrice: number | null) => void;

  recalculateServicePrices: () => void;
  recalculateEngineeringServicePrices: () => void;
  recalculateFoundationPrice: () => void;
  recalculateWallPrice: () => void;
  recalculateDoorPrice: () => void;
  recalculateWindowPrice: () => void;
  recalculateFacadePrice: () => void;
  recalculateDraftPrice: () => void;
  recalculateRoofPrice: () => void;
  recalculateWallDecorationPrice: () => void;
  recalculateFloorCoveringPrice: () => void;
  recalculateCeilingCoveringPrice: () => void;
};

export const useCalculationStore = create<CalculationStore>((set, get) => ({
  region: { value: "moskva", label: "Москва", coefficient: 1.5 },
  floors: "1",
  totalPrice: 0,
  length: 10,
  width: 10,
  squareLand: 10,
  selectedServices: [],
  selectedEngineeringServices: [],
  foundationType: null,
  foundationPrice: null,
  wallType: null,
  wallPrice: null,
  doorType: null,
  doorPrice: null,
  windowType: null,
  windowPrice: null,
  roofType: null,
  roofPrice: null,
  facadeType: null,
  facadePrice: null,
  draftType: null,
  draftPrice: null,
  wallDecorationType: null,
  wallDecorationPrice: null,
  ceilingCoveringType: null,
  ceilingCoveringPrice: null,
  floorCoveringType: null,
  floorCoveringPrice: null,

  setRegion: (region) => {
    set({ region });
    get().recalculateServicePrices();
    get().calculateTotalPrice();
  },
  setFloors: (floors) => set({ floors }),
  setLength: (length) => set({ length }),
  setWidth: (width) => set({ width }),
  setSquareLand: (squareLand) => set({ squareLand }),
  setFoundationType: (foundationType) => {
    set({ foundationType });
    get().recalculateFoundationPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setFoundationPrice: (foundationPrice) => {
    set({ foundationPrice });
    get().recalculateFoundationPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setWallType: (wallType) => {
    set({ wallType });
    get().recalculateWallPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setWallPrice: (wallPrice) => {
    set({ wallPrice });
    get().recalculateWallPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setDoorsType: (doorType) => {
    set({ doorType });
    get().recalculateDoorPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setDoorsPrice: (doorPrice) => {
    set({ doorPrice });
    get().recalculateDoorPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setWindowsType: (windowType) => {
    set({ windowType });
    get().recalculateWindowPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setWindowsPrice: (windowPrice) => {
    set({ windowPrice });
    get().recalculateWindowPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setWallDecorationType: (wallDecorationType) => {
    set({ wallDecorationType });
    get().recalculateWallDecorationPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setWallDecorationPrice: (wallDecorationPrice) => {
    set({ wallDecorationPrice });
    get().recalculateWallDecorationPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setCeilingCoveringType: (ceilingCoveringType) => {
    set({ ceilingCoveringType });
    get().recalculateCeilingCoveringPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setCeilingCoveringPrice: (ceilingCoveringPrice) => {
    set({ ceilingCoveringPrice });
    get().recalculateCeilingCoveringPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setFloorCoveringType: (floorCoveringType) => {
    set({ floorCoveringType });
    get().recalculateFloorCoveringPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setFloorCoveringPrice: (floorCoveringPrice) => {
    set({ floorCoveringPrice });
    get().recalculateFloorCoveringPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setFacadeType: (facadeType) => {
    set({ facadeType });
    get().recalculateFacadePrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setFacadePrice: (facadePrice) => {
    set({ facadePrice });
    get().recalculateFacadePrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setDraftType: (draftType) => {
    set({ draftType });
    get().recalculateDraftPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setDraftPrice: (draftPrice) => {
    set({ draftPrice });
    get().recalculateDraftPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  setRoofType: (roofType) => {
    set({ roofType });
    get().recalculateRoofPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },
  setRoofPrice: (roofPrice) => {
    set({ roofPrice });
    get().recalculateRoofPrice(); // Пересчитываем цену фундамента при изменении типа
    get().calculateTotalPrice();
  },

  addService: (service) =>
    set((state) => ({
      selectedServices: [...state.selectedServices, service],
    })),
  removeService: (serviceId) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter(
        (service) => service.id !== serviceId,
      ),
    })),
  addEngineeringService: (service) =>
    set((state) => ({
      selectedEngineeringServices: [
        ...state.selectedEngineeringServices,
        service,
      ],
    })),
  removeEngineeringService: (serviceId) =>
    set((state) => ({
      selectedEngineeringServices: state.selectedEngineeringServices.filter(
        (service) => service.id !== serviceId,
      ),
    })),

  recalculateServicePrices: () => {
    const region = get().region;
    const selectedServices = get().selectedServices;

    const coefficient = region
      ? regions.find((r) => r.value === region.value)?.coefficient || 1
      : 1;

    const updatedServices = selectedServices.map((service) => {
      const baseService = services.find((s) => s.id === service.id);
      if (baseService) {
        return {
          ...service,
          price: Math.round(baseService.basePrice * coefficient),
        };
      }
      return service;
    });

    set({ selectedServices: updatedServices });
  },
  recalculateEngineeringServicePrices: () => {
    const region = get().region;
    const selectedServices = get().selectedEngineeringServices;

    const coefficient = region
      ? regions.find((r) => r.value === region.value)?.coefficient || 1
      : 1;

    const updatedServices = selectedServices.map((service) => {
      const baseService = engineeringServices.find((s) => s.id === service.id);
      if (baseService) {
        return {
          ...service,
          price: Math.round(baseService.basePrice * coefficient),
        };
      }
      return service;
    });

    set({ selectedEngineeringServices: updatedServices });
  },

  recalculateFoundationPrice: () => {
    const { foundationType, length, width } = get();
    const totalArea = length * width; // Площадь основания (длина * ширина)

    if (!foundationType) return;

    const foundation = foundations.find((f) => f.label === foundationType);

    if (foundation) {
      const price = Math.round(foundation.basePrice * totalArea);
      set({ foundationPrice: price });
    }
  },

  calculateTotalPrice: () => {
    const {
      foundationPrice,
      wallPrice,
      doorPrice,
      windowPrice,
      facadePrice,
      draftPrice,
      roofPrice,
      wallDecorationPrice,
      floorCoveringPrice,
      ceilingCoveringPrice,
      selectedServices,
      selectedEngineeringServices,
    } = get();

    const serviceTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const engineeringServiceTotal = selectedEngineeringServices.reduce(
      (sum, s) => sum + s.price,
      0,
    );

    const total = [
      foundationPrice,
      wallPrice,
      doorPrice,
      windowPrice,
      facadePrice,
      draftPrice,
      roofPrice,
      wallDecorationPrice,
      floorCoveringPrice,
      ceilingCoveringPrice,
    ]
      .filter((v) => v != null)
      .reduce((sum, v) => sum + (v || 0), 0);

    set({ totalPrice: total + serviceTotal + engineeringServiceTotal });
  },

  recalculateWindowPrice: () => {
    const { windowType, floors } = get();

    if (!windowType) return;

    const window = windows.find((f) => f.label === windowType);

    if (window) {
      const price = Math.round(window.basePrice * Number(floors));
      set({ windowPrice: price });
    }
  },

  recalculateDoorPrice: () => {
    const { doorType, floors } = get();

    if (!doorType) return;

    const door = doors.find((f) => f.label === doorType);

    if (door) {
      const price = Math.round(door.basePrice * Number(floors));
      set({ doorPrice: price });
    }
  },

  recalculateWallDecorationPrice: () => {
    const { wallDecorationType, length, width } = get();
    const totalArea = length * width;

    if (!wallDecorationType) return;

    const wallDecoration = walllDecoration.find(
      (f) => f.label === wallDecorationType,
    );

    if (wallDecoration) {
      const price = Math.round(wallDecoration.basePrice * totalArea);
      set({ wallDecorationPrice: price });
    }
  },

  recalculateFloorCoveringPrice: () => {
    const { floorCoveringType, length, width } = get();
    const totalArea = length * width;

    if (!floorCoveringType) return;

    const floorCovering = floorrrCovering.find(
      (f) => f.label === floorCoveringType,
    );

    if (floorCovering) {
      const price = Math.round(floorCovering.basePrice * totalArea);
      set({ floorCoveringPrice: price });
    }
  },

  recalculateCeilingCoveringPrice: () => {
    const { ceilingCoveringType, length, width } = get();
    const totalArea = length * width;

    if (!ceilingCoveringType) return;

    const ceilingCovering = floorrrCovering.find(
      (f) => f.label === ceilingCoveringType,
    );

    if (ceilingCovering) {
      const price = Math.round(ceilingCovering.basePrice * totalArea);
      set({ ceilingCoveringPrice: price });
    }
  },

  recalculateWallPrice: () => {
    const { wallType, length, width } = get();
    const totalArea = length * width; // Площадь основания (длина * ширина)

    if (!wallType) return;

    const wall = walls.find((f) => f.label === wallType);

    if (wall) {
      const price = Math.round(wall.basePrice * totalArea);
      set({ wallPrice: price });
    }
  },

  recalculateFacadePrice: () => {
    const { facadeType, length, width } = get();
    const totalArea = length * width; // Площадь основания (длина * ширина)

    if (!facadeType) return;

    const facade = facades.find((f) => f.label === facadeType);

    if (facade) {
      const price = Math.round(facade.basePrice * totalArea);
      set({ facadePrice: price });
    }
  },

  recalculateDraftPrice: () => {
    const { draftType, floors } = get();

    if (!draftType) return;

    const draft = drafts.find((f) => f.label === draftType);

    if (draft) {
      const price = Math.round(draft.basePrice * Number(floors));
      set({ draftPrice: price });
    }
  },

  recalculateRoofPrice: () => {
    const { roofType, length, width } = get();
    const totalArea = length * width; // Площадь основания (длина * ширина)

    if (!roofType) return;

    const roof = roofs.find((f) => f.label === roofType);

    if (roof) {
      const price = Math.round((roof.basePrice * totalArea) / 1.5);
      set({ roofPrice: price });
    }
  },
}));
