import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Match } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDynamicMatchStatus = (match: Match): Match['status'] => {
  const now = new Date().getTime();
  const startTime = new Date(match.startTime).getTime();
  const endTime = new Date(match.endTime).getTime();

  if (now < startTime) {
    return 'Upcoming';
  } else if (now >= startTime && now <= endTime) {
    return 'Live';
  } else {
    return 'Recent';
  }
};
