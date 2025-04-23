import ShoesContext from "./ShoesContext";
import { useState, useEffect } from "react";

export const ShoesProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);

  // Fetch shoes data from JSON file and set it in state
  async function fetchShoes() {
    const response = await fetch("shoes.json");
    const data = await response.json();
    setShoes(data);
  }

  useEffect(() => {
    fetchShoes();
  }, []);

  return (
    <ShoesContext.Provider value={{ shoes, setShoes }}>
      {children}
    </ShoesContext.Provider>
  );
};
