import { useState, useContext, useEffect } from "react";
import "../styles.css";
import SubHeader from "./SubHeader";
import Filter from "./Filter";
import ShoesGrid from "./ShoesGrid";
import Pagination from "./Pagination";
import SelectedShoeContext from "../context/SelectedShoeContext";
import ShoeDetails from "./ShoeDetails";

export default function PageContent({ shoes, category }) {
  const [shoeResults, setShoeResults] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const { selectedShoe } = useContext(SelectedShoeContext);

  let shoeCount = shoeResults.length;

  // Get the days difference of the release date and today
  const today = new Date();
  const getDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1 > today || d2 > today) {
      return 91; // if it is later than 90 days, return a number greater than 90
    }
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Check if the shoe is a new release (within 90 days (3 months))
  const isNewRelease = (shoe) => {
    return getDaysDifference(today, shoe.releaseDate) <= 90;
  };

  // Filter shoes based on the selected category
  const categorizedShoes = shoes.filter((shoe) => {
    const categoryFilters = {
      "NEW RELEASES": (shoe) => isNewRelease(shoe),
      "MEN'S KICKS": (shoe) => shoe.gender === "Men",
      "MEN'S NEW RELEASES": (shoe) =>
        shoe.gender === "Men" && isNewRelease(shoe),
      "MEN'S BEST SELLERS": (shoe) => shoe.gender === "Men" && shoe.bestSeller,
      "MEN'S ON SALE": (shoe) => shoe.gender === "Men" && shoe.onSale,
      "WOMEN'S KICKS": (shoe) => shoe.gender === "Women",
      "WOMEN'S NEW RELEASES": (shoe) =>
        shoe.gender === "Women" && isNewRelease(shoe),
      "WOMEN'S BEST SELLERS": (shoe) =>
        shoe.gender === "Women" && shoe.bestSeller,
      "WOMEN'S ON SALE": (shoe) => shoe.gender === "Women" && shoe.onSale,
      "KIDS' KICKS": (shoe) => shoe.kids,
      "KIDS' NEW RELEASES": (shoe) => shoe.kids && isNewRelease(shoe),
      "KIDS' BEST SELLERS": (shoe) => shoe.kids && shoe.bestSeller,
      "KIDS' ON SALE": (shoe) => shoe.kids && shoe.onSale,
      "BEST SELLERS": (shoe) => shoe.bestSeller,
      "KICKS ON SALE": (shoe) => shoe.onSale,
    };

    return categoryFilters[category] ? categoryFilters[category](shoe) : true;
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when a shoe is selected
  }, [selectedShoe]);

  return (
    <div className="container">
      {/* If a shoe is selected, show the shoe details */}
      {/* Otherwise, show the shoes grid and pagination */}
      {selectedShoe ? (
        <ShoeDetails></ShoeDetails>
      ) : (
        <div>
          <SubHeader category={category}></SubHeader>
          <Filter
            shoes={categorizedShoes}
            shoeResults={(results) => setShoeResults(results)}
          ></Filter>
          <ShoesGrid shoes={currentItems} shoeCount={shoeCount}></ShoesGrid>
          <Pagination
            shoes={shoeResults}
            currentShoes={(items) => setCurrentItems(items)}
          ></Pagination>
        </div>
      )}
    </div>
  );
}
