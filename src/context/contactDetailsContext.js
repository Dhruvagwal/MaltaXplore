import React, { createContext, useContext, useState } from "react";

const ContactDetailsContext = createContext();

export const useContactDetails = () => {
  return useContext(ContactDetailsContext);
};

export const ContactDetailsProvider = ({ children }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");  
  
  return (
    <ContactDetailsContext.Provider
      value={{
        fname,
        setFname,
        lname,
        setLname,
        email,
        setEmail,
        phone,
        setPhone,
        pickupLocation,
        setPickupLocation,
      }}
    >
      {children}
    </ContactDetailsContext.Provider>
  );
};
