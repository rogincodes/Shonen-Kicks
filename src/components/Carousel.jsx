import { useContext, useEffect, useState, useRef } from "react";
import "../styles.css";
import ShoesContext from "../context/ShoesContext";
import SelectedShoeContext from "../context/SelectedShoeContext";

export default function Carousel() {
  const { shoes } = useContext(ShoesContext);
  const [randomShoes, setRandomShoes] = useState([]);
  const { selectedShoe, setSelectedShoe } = useContext(SelectedShoeContext);
  const carouselRef = useRef(null);

  const getRandomNumbers = () => {
    const max = Math.min(10, shoes.length);
    const excluded = selectedShoe.id - 1;
    const randomNumbers = new Set();

    while (randomNumbers.size < max) {
      const randomNumber = Math.floor(Math.random() * shoes.length);
      if (randomNumber !== excluded) {
        randomNumbers.add(randomNumber);
      }
    }
    return Array.from(randomNumbers);
  };

  const getRandomShoes = () => {
    const randomNumbers = getRandomNumbers();
    const randomShoes = randomNumbers.map((number) => shoes[number]);
    setRandomShoes(randomShoes);
  };

  useEffect(() => {
    if (shoes && shoes.length >= 10) {
      getRandomShoes();
    }
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0; // or scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [shoes, selectedShoe]);

  return (
    <div className="carousel" ref={carouselRef}>
      {randomShoes.map((shoe) => (
        <div
          key={shoe.id}
          className="carousel-item"
          onClick={() => setSelectedShoe(shoe)}
        >
          <img src={shoe.image} alt={shoe.name} className="carousel-image" />
          <div className="shoe-content">
            <p className="shoe-name">{shoe.name}</p>
            <p>
              {shoe.kids
                ? "(KIDS')"
                : shoe.gender === "Men"
                ? "(MEN'S)"
                : "(WOMEN'S)"}
            </p>
            <div className="price-container">
              <p className={`shoe-price ${shoe.onSale ? "markdown" : ""}`}>
                ${shoe.price}
              </p>
              <p
                className={`shoe-price sale-price ${shoe.onSale ? "" : "hide"}`}
              >
                ${shoe.salePrice}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
