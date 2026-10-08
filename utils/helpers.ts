import { RefObject } from "react";

export const handleOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  e: MouseEvent,
  close: () => void,
) => {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    close();
  }
};

/**
 * @description Return a formated readable date
 * @param dateInput acceptes `Date` as a date or `number` as a timestamp
 * @param format {number} returned form acceptes 1 value just `0` for now
 * @param relative {boolean} Determines whether the result is relative date or not
 * @example foramtDate(anyDateObject, 1, false) //
 */
export const foramtDate = (
  dateInput: Date | number | string,
  format: number = 0,
  relative: boolean = true,
): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();

  if (relative) {
    // Calculate dates without hours and minutes
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfGivenDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    // Calculate the difference in timestamps
    const diffInDays = Math.round(
      (startOfToday.getTime() - startOfGivenDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // Difference in minutes and seconds
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // If the date in the future
    if (diffInSeconds < 0) {
      return "In future";
    }

    // In same day dates
    if (diffInDays === 0) {
      if (diffInSeconds < 60) {
        return `seconds ago`;
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes === 1) return "A minute ago";
      if (diffInMinutes === 2) return "Couple minutes ago";
      if (diffInMinutes >= 3 && diffInMinutes <= 10)
        return `${diffInMinutes} minutes ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours === 0) return `${diffInMinutes} minutes ago`;

      if (diffInHours === 1) return "An hour ago";
      if (diffInHours === 2) return "Couple hours ago";
      if (diffInHours >= 3 && diffInHours <= 10)
        return `${diffInHours} hours ago`;
    }

    // Deal with days
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays === 2) return "Couple days ago";
    if (diffInDays >= 3 && diffInDays < 30) return `${diffInDays} days ago`;

    // Deal with monthes
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return "Month ago";
    if (diffInMonths === 2) return "Couple mouthes ago";
    if (diffInMonths >= 3 && diffInMonths <= 12)
      return `${diffInMonths} monthes ago`;

    return date.toLocaleDateString("ar-EG");
  }

  return "";
};
