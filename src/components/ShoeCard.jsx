import "../styles.css";

export default function ShoeCard({ shoe }) {
  return (
    <div className="shoe-card">
      <img src={shoe.image} alt={shoe.name} />
      <div className="shoe-content">
        <p className="shoe-anime">{shoe.anime}</p>
        <p className="shoe-name">{shoe.name}</p>
        <div className="price-container">
          <p className={`shoe-price ${shoe.onSale ? "markdown" : ""}`}>
            ${shoe.price}
          </p>
          <p className={`shoe-price sale-price ${shoe.onSale ? "" : "hide"}`}>
            ${shoe.salePrice}
          </p>
        </div>
      </div>
    </div>
  );
}
