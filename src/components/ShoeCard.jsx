import { useContext } from "react";
import "../styles.css";
import SelectedShoeContext from "../context/SelectedShoeContext";

export default function ShoeCard({ shoe }) {
  const { setSelectedShoe } = useContext(SelectedShoeContext);

  return (
    <div
      key={shoe.id}
      className="shoe-card"
      onClick={() => setSelectedShoe(shoe)}
    >
      <img src={shoe.image} alt={shoe.name} />
      <div className="shoe-content">
        <p className="shoe-anime">{shoe.anime}</p>
        <p className="shoe-name">
          {shoe.name}{" "}
          <span>
            {shoe.kids
              ? "(KIDS')"
              : shoe.gender === "Men"
              ? "(MEN'S)"
              : "(WOMEN'S)"}
          </span>
        </p>
        <div className="price-container">
          {/* Adds a line-through decoration to the original price if the shoe is on sale */}
          <p className={`shoe-price ${shoe.onSale ? "markdown" : ""}`}>
            ${shoe.price}
          </p>
          {/* Sale price is displayed if on sale, and hidden if not on sale */}
          <p className={`shoe-price sale-price ${shoe.onSale ? "" : "hide"}`}>
            ${shoe.salePrice}
          </p>
        </div>
      </div>
    </div>
  );
}
