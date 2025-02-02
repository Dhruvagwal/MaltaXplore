import { format } from "date-fns";

export const formatDate = (date) => {
  try {
    return format(new Date(Number(date)), "PPP");
  } catch (e) {
    return "";
  }
};
