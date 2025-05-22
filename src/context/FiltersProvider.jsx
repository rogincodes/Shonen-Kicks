import FiltersContext from "./FiltersContext";
import { useState } from "react";

export const FiltersProvider = ({ children }) => {
  const [anime, setAnime] = useState([]);
  const [gender, setGender] = useState([]);
  const [kids, setKids] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  return (
    // Provide the cart items context to the app
    <FiltersContext.Provider
      value={{
        anime,
        setAnime,
        gender,
        setGender,
        kids,
        setKids,
        priceRange,
        setPriceRange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
