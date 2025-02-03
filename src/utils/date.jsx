import { format } from "date-fns";

export const formatDate = (date) => {
  try {
    return format(new Date(Number(date)), "PPP");
  } catch (e) {
    return "";
  }
};

export const formatTime = (time) => {
  try {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return "";
  }
};

export function convertTimestampToDate(timestamp) {
  if (isNaN(timestamp)) {
    console.error("Invalid timestamp:", timestamp);
    return "Invalid date"; 
  }
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}