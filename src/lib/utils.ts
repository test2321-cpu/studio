import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Match } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getCombinedDateTime(date: string, time: string): Date {
  const dateString = date.replace(/-/g, '/');
  return new Date(`${dateString}T${time}`);
}

export const getDynamicMatchStatus = (match: Match): Match['status'] => {
  // If the status is explicitly set to 'completed' or 'live', respect it first.
  if (match.status === 'completed') {
    return 'Recent';
  }
   if (match.status === 'live') {
    return 'Live';
  }

  const now = new Date().getTime();
  const matchDateTime = getCombinedDateTime(match.start_date, match.start_time).getTime();
  
  // A typical match lasts about 3.5 hours for T20, 7-8 for ODI
  // We'll use a 4-hour window for simplicity
  const fourHoursInMillis = 4 * 60 * 60 * 1000;
  const endTime = matchDateTime + fourHoursInMillis;

  if (now < matchDateTime) {
    return 'Upcoming';
  } else if (now >= matchDateTime && now <= endTime) {
    // If within the time window, but not explicitly 'completed', it's Live
    return 'Live';
  } else {
    // If past the time window, it's Recent
    return 'Recent';
  }
};
