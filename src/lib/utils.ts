import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Match } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDynamicMatchStatus = (match: Match): Match['status'] => {
  const now = new Date().getTime();
  const matchTime = new Date(match.dateTime).getTime();
  const matchDuration = 3.5 * 60 * 60 * 1000; // Approx. 3.5 hours for a T20
  const endTime = matchTime + matchDuration;

  if (now < matchTime) {
    return 'Upcoming';
  } else if (now >= matchTime && now <= endTime) {
    // If original status is Recent, it means the match is over.
    if (match.status === 'Recent') return 'Recent';
    return 'Live';
  } else {
    return 'Recent';
  }
};