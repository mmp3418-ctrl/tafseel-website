export type SystemId = "solidroll" | "solidplus";

export type HardwareId = "manual" | "motor" | "smart";

export type ColorId = "black" | "white" | "anthracite" | "bronze" | "gold";

export type ConfigStep = 1 | 2 | 3 | 4;

export interface ProductSystem {
  id: SystemId;
  nameAr: string;
  nameEn: string;
  badge: string;
  description: string;
  pricePerM2: number;
  features: string[];
}

export interface HardwareOption {
  id: HardwareId;
  nameAr: string;
  description: string;
  priceModifier: number;
}

export interface ColorOption {
  id: ColorId;
  nameAr: string;
  hex: string;
  priceModifier: number;
}

export interface ConfigState {
  system: SystemId;
  widthCm: number;
  heightCm: number;
  hardware: HardwareId;
  color: ColorId;
  openPercent: number;
}

export interface PriceBreakdown {
  areaM2: number;
  basePrice: number;
  hardwareExtra: number;
  colorExtra: number;
  total: number;
}
