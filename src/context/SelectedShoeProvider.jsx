import SelectedShoeContext from "./SelectedShoeContext";
import { useState } from "react";

export const SelectedShoeProvider = ({ children }) => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  return (
    // Provide the selected shoe context to the app
    <SelectedShoeContext.Provider value={{ selectedShoe, setSelectedShoe }}>
      {children}
    </SelectedShoeContext.Provider>
  );
};
