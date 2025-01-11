import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const useAddress = () => {
  return useContext(AddressContext);
};

export const AddressProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <AddressContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        street,
        setStreet,
        city,
        setCity,
        state,
        setState,
        postalCode,
        setPostalCode,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
