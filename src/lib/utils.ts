import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function biasColor(score: number): string {
  if (score >= 3) return "text-emerald-500";
  if (score <= -3) return "text-red-500";
  return "text-yellow-500";
}

export function formatPrice(price: number | undefined | null, minDecimals = 2) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: minDecimals }).format(price || 0);
}

export function formatPnL(amount: number | undefined | null) {
  const val = amount || 0;
  const isPositive = val >= 0;
  return {
    text: isPositive ? `+${formatPrice(val)}` : `-${formatPrice(Math.abs(val))}`,
    className: isPositive ? "text-bullish" : "text-error",
  };
}
