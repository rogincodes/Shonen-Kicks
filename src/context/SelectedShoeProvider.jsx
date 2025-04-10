import SelectedShoeContext from "./SelectedShoeContext";
import { useState } from "react";

export const SelectedShoeProvider = ({ children }) => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  return (
    <SelectedShoeContext.Provider value={{ selectedShoe, setSelectedShoe }}>
      {children}
    </SelectedShoeContext.Provider>
  );
};
