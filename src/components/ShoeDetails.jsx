import { useContext, useState, useEffect } from "react";
import "../styles.css";
import SelectedShoeContext from "../context/SelectedShoeContext";
import Carousel from "./Carousel";
import { ShoesProvider } from "../context/ShoesProvider";
import CartItemsContext from "../context/CartItemsContext";

export default function ShoeDetails() {
  const { selectedShoe, setSelectedShoe } = useContext(SelectedShoeContext);
  const { order, setOrder } = useContext(CartItemsContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // Size options for different categories
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

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  });

  // Function to get size options based on selected shoe category
  const getSizeOptions = () => {
    if (selectedShoe.kids) return sizeOptions.kids;
    if (selectedShoe.gender === "Men") return sizeOptions.men;
    return sizeOptions.women;
  };

  const addToCart = (shoe) => {
    const existingItem = order.find((item) => item.id === shoe.id);
    const existingSize = order.find((item) => item.size === shoe.size);
    if (existingItem && existingSize) {
      setOrder((prevOrder) =>
        prevOrder.map(
          (item) =>
            item.id === shoe.id && item.size === shoe.size
              ? { ...item, quantity: item.quantity + 1 }
              : { ...item, quantity: item.quantity } // Keep the same quantity for other items
        )
      );
    } else {
      setOrder((prevOrder) => [...prevOrder, { ...shoe, quantity: 1 }]);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setActiveSize(size);
  };

  const handleAddToCart = () => {
    const desiredShoes = { ...selectedShoe, size: selectedSize };
    if (selectedSize) {
      addToCart(desiredShoes);
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  return (
    <div className="shoe-details-container">
      <div className="shoe-details-content">
        {/* Floating back button to get back to homepage */}
        <button className="floating-back" onClick={() => setSelectedShoe(null)}>
          <img src="./icons/back-button.png" alt="Back" />
        </button>
        {/* Selected shoe details section */}
        <div className="shoe-details-image-wrapper">
          <img src={selectedShoe.image} alt={selectedShoe.name} />
        </div>

        <div className="shoe-details">
          <p className="shoe-details-anime">
            {selectedShoe.anime.toUpperCase()}
          </p>
          <p className="shoe-details-type">
            {selectedShoe.kids
              ? "KIDS' SHOES"
              : selectedShoe.gender === "Men"
              ? "MEN'S SHOES"
              : "WOMEN'S SHOES"}
          </p>
          <h1 className="shoe-details-name">
            {selectedShoe.name.toUpperCase()}
          </h1>
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
              <button
                key={size}
                onClick={() => {
                  handleSizeSelection(size);
                }}
                className={activeSize === size ? "active" : ""}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to cart button */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          {/* Description of the shoe */}
          <p className="shoe-description">{selectedShoe.description}</p>

          {/* 'You Might Also Like' section featuring a carousel design */}
          <div
            className={`shoe-recommendations ${width >= 1024 ? "hide" : ""}`}
          >
            <h3 className="recommendation-title">YOU MIGHT ALSO LIKE</h3>
            <div className="shoe-recommendations-list">
              <ShoesProvider>
                <Carousel />
              </ShoesProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
