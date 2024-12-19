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

  const timeDifference = currentDate.getTime() - vietnamTime.getTime();

  if (timeDifference < 60 * 60 * 1000) {
    // Nếu dưới 1 giờ, hiển thị số phút
    const minutes = Math.floor(timeDifference / (60 * 1000));
    return `${minutes} phút trước`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // Nếu dưới 24 giờ, hiển thị số giờ
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    return `${hours} giờ trước`;
  } else {
    // Nếu trên 24 giờ, hiển thị ngày, giờ và năm
    return format(vietnamTime, "dd/MM/yyyy HH:mm", { locale: vi });
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
