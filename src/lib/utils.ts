import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNowStrict, addHours } from "date-fns";
import { vi } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

// Hàm ghép class
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hàm định dạng ngày tương đối theo thời gian Việt Nam
export function formatRelativeDate(from: Date) {
  // Chuyển thời gian sang múi giờ Việt Nam
  const vietnamTime = addHours(from, 7); 
  const currentDate = addHours(new Date(), 7);

  if (currentDate.getTime() - vietnamTime.getTime() < 24 * 60 * 60 * 1000) {
    // Hiển thị thời gian tương đối (vd: "2 giờ trước", "1 ngày trước")
    return formatDistanceToNowStrict(vietnamTime, { addSuffix: true, locale: vi });
  } else {
    if (currentDate.getFullYear() === vietnamTime.getFullYear()) {
      // Hiển thị ngày tháng trong năm hiện tại
      return format(vietnamTime, "dd/MM", { locale: vi });
    } else {
      // Hiển thị ngày tháng và năm khác
      return format(vietnamTime, "dd/MM/yyyy", { locale: vi });
    }
  }
}

// Hàm định dạng số
export function formatNumber(n: number): string {
  return Intl.NumberFormat("vi-VN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

// Hàm chuyển đổi chuỗi thành slug
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
