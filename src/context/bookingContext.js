import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

// Custom hook to access the context
export const useBooking = () => {
  return useContext(BookingContext);
};

// Provider component
export const BookingProvider = ({ children }) => {
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState("nov-4");

  return (
    <BookingContext.Provider
      value={{
        adults,
        setAdults,
        child,
        setChild,
        totalPrice,
        setTotalPrice,
        date,
        setDate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
