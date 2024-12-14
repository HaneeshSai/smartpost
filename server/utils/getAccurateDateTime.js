import { parse, subDays, format } from "date-fns";

export const convertToDateTime = (dateStr) => {
  const now = new Date();

  try {
    if (dateStr.includes("days ago")) {
      const days = parseInt(dateStr.split(" ")[0], 10);
      return subDays(now, days);
    }
    return parse(dateStr, "d MMMM", now);
  } catch (error) {
    console.log(error);
  }
};
