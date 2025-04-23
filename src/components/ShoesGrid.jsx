import "../styles.css";
import ShoeCard from "./ShoeCard";

export default function ShoesGrid({ shoes, shoeCount }) {
  return (
    <div>
      <p className="results-count">
        <strong>{shoeCount}</strong> Results
      </p>
      <div className="shoes-grid">
        {/* Map through the shoes array and render a ShoeCard for each shoe */}
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe}></ShoeCard>
        ))}
      </div>
      <div></div>
    </div>
  );
}
