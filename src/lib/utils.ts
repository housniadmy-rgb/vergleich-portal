import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, unit: string): string {
  if (unit === "einmalig") {
    return `${price.toLocaleString("de-DE", { minimumFractionDigits: 0 })} €`;
  }
  return `${price.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €/${unit}`;
}

export function renderStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
}
