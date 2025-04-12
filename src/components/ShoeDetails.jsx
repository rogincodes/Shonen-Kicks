import { useContext } from "react";
import "../styles.css";
import SelectedShoeContext from "../context/SelectedShoeContext";
import Carousel from "./Carousel";
import { ShoesProvider } from "../context/ShoesProvider";

export default function ShoeDetails() {
  const { selectedShoe, setSelectedShoe } = useContext(SelectedShoeContext);

  const sizeOptions = {
    kids: [
      "1Y / EU 32",
      "1.5Y / EU 33",
      "2Y / EU 33.5",
      "2.5Y / EU 34",
      "3Y / EU 35",
      "3.5Y / EU 35.5",
      "4Y / EU 36",
      "4.5Y / EU 36.5",
      "5Y / EU 37.5",
    ],
    men: [
      "US 5.5 / EU 38",
      "US 6 / EU 38.5",
      "US 6.5 / EU 39",
      "US 7 / EU 40",
      "US 7.5 / EU 40.5",
      "US 8 / EU 41",
      "US 8.5 / EU 42",
      "US 9 / EU 42.5",
      "US 9.5 / EU 43",
      "US 10 / EU 44",
      "US 10.5 / EU 44.5",
      "US 11 / EU 45",
      "US 11.5 / EU 45.5",
      "US 12 / EU 46",
      "US 12.5 / EU 47",
      "US 13 / EU 47.5",
      "US 13.5 / EU 48",
      "US 14 / EU 48.5",
    ],
    women: [
      "US 5 / EU 35.5",
      "US 5.5 / EU 36",
      "US 6 / EU 36.5",
      "US 6.5 / EU 37.5",
      "US 7 / EU 38",
      "US 7.5 / EU 38.5",
      "US 8 / EU 39",
      "US 8.5 / EU 40",
      "US 9 / EU 40.5",
      "US 9.5 / EU 41",
      "US 10 / EU 42",
      "US 10.5 / EU 42.5",
      "US 11 / EU 43",
      "US 11.5 / EU 44",
    ],
  };

  const getSizeOptions = () => {
    if (selectedShoe.kids) return sizeOptions.kids;
    if (selectedShoe.gender === "Men") return sizeOptions.men;
    return sizeOptions.women;
  };

  return (
    <div className="shoe-details-container">
      <button className="floating-back" onClick={() => setSelectedShoe(null)}>
        <img src="./icons/back-button.png" alt="Back" />
      </button>
      <img src={selectedShoe.image} alt={selectedShoe.name} />
      <div className="shoe-details">
        <p className="shoe-details-anime">{selectedShoe.anime.toUpperCase()}</p>
        <p className="shoe-details-type">
          {selectedShoe.kids
            ? "KIDS' SHOES"
            : selectedShoe.gender === "Men"
            ? "MEN'S SHOES"
            : "WOMEN'S SHOES"}
        </p>
        <h1 className="shoe-details-name">{selectedShoe.name.toUpperCase()}</h1>
        <div className="price-container">
          <p
            className={`shoe-details-price ${
              selectedShoe.onSale ? "markdown" : ""
            }`}
          >
            ${selectedShoe.price}
          </p>
          <p
            className={`shoe-details-price sale-price ${
              selectedShoe.onSale ? "" : "hide"
            }`}
          >
            ${selectedShoe.salePrice}
          </p>
        </div>

        <div className="shoe-select">
          <p>Select Size</p>
          <div>
            <img src="./icons/measure.png" alt="Size Guide" />
            <p>Size Guide</p>
          </div>
        </div>
        <div className="shoe-size-options">
          {getSizeOptions().map((size) => (
            <button key={size}>{size}</button>
          ))}
        </div>
        <button className="add-to-cart-button">ADD TO CART</button>
        <p className="shoe-description">{selectedShoe.description}</p>

        <div className="shoe-reccommendations">
          <h3 className="recommendation-title">YOU MIGHT ALSO LIKE</h3>
          <div className="shoe-recommendations-list">
            <ShoesProvider>
              <Carousel />
            </ShoesProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
