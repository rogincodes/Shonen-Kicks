import "../styles.css";
import { useContext } from "react";
import FiltersContext from "../context/FiltersContext";

export default function Filter({
  filterIsOpen,
  toggleFilter,
  hasFilter,
  filterCount,
  clearFilter,
}) {
  const {
    anime,
    setAnime,
    gender,
    setGender,
    kids,
    setKids,
    priceRange,
    setPriceRange,
  } = useContext(FiltersContext);

  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setGender((prev) => {
      return checked
        ? [...prev, value]
        : prev.filter((gender) => gender !== value);
    });
  };

  const handleKidsChange = (event) => {
    const { value, checked } = event.target;
    setKids((prev) => {
      return checked ? [...prev, value] : prev.filter((kids) => kids !== value);
    });
  };

  const handleAnimeChange = (event) => {
    const { value, checked } = event.target;
    setAnime((prev) => {
      return checked
        ? [...prev, value]
        : prev.filter((anime) => anime !== value);
    });
  };

  const handlePriceRangeChange = (event) => {
    const { value, checked } = event.target;
    setPriceRange((prev) => {
      return checked
        ? [...prev, value]
        : prev.filter((priceRange) => priceRange !== value);
    });
  };

  return (
    <div className={`filter-container ${filterIsOpen ? "active" : ""}`}>
      <button
        className="close-filter-button"
        onClick={() => toggleFilter(false)}
      >
        ✖
      </button>
      <div className="filter-content">
        <h2>FILTER BY</h2>

        {/* GENDER FILTER GROUP */}
        <div className={`filter-group ${kids.length > 0 ? "hide" : ""}`}>
          <h3>Gender</h3>
          <div className="filter-options">
            <label>
              <input
                name="gender"
                type="checkbox"
                value="Men"
                checked={gender.includes("Men")}
                onChange={(event) => handleGenderChange(event)}
              />
              Men
            </label>
            <label>
              <input
                name="gender"
                type="checkbox"
                value="Women"
                checked={gender.includes("Women")}
                onChange={(event) => handleGenderChange(event)}
              />
              Women
            </label>
          </div>
        </div>

        {/* KIDS FILTER GROUP */}
        <div className={`filter-group ${gender.length > 0 ? "hide" : ""}`}>
          <h3>Kids</h3>
          <div className="filter-options">
            <label>
              <input
                name="kids"
                type="checkbox"
                value="Boys"
                checked={kids.includes("Boys")}
                onChange={(event) => handleKidsChange(event)}
              />
              Boys
            </label>
            <label>
              <input
                name="kids"
                type="checkbox"
                value="Girls"
                checked={kids.includes("Girls")}
                onChange={(event) => handleKidsChange(event)}
              />
              Girls
            </label>
          </div>
        </div>

        {/* ANIME FILTER GROUP */}
        <div className="filter-group">
          <h3>Anime</h3>
          <div className="filter-options">
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Attack on Titan"
                checked={anime.includes("Attack on Titan")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Attack on Titan
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Black Clover"
                checked={anime.includes("Black Clover")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Black Clover
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Bleach"
                checked={anime.includes("Bleach")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Bleach
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Demon Slayer"
                checked={anime.includes("Demon Slayer")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Demon Slayer
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Dragon Ball"
                checked={anime.includes("Dragon Ball")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Dragon Ball
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Fairy Tail"
                checked={anime.includes("Fairy Tail")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Fairy Tail
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Haikyuu!!"
                checked={anime.includes("Haikyuu!!")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Haikyuu!!
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Hunter x Hunter"
                checked={anime.includes("Hunter x Hunter")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Hunter x Hunter
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Jujutsu Kaisen"
                checked={anime.includes("Jujutsu Kaisen")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Jujutsu Kaisen
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Kuroko no Basket"
                checked={anime.includes("Kuroko no Basket")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Kuroko no Basket
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Mob Psycho 100"
                checked={anime.includes("Mob Psycho 100")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Mob Psycho 100
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Naruto"
                checked={anime.includes("Naruto")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Naruto
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="One Piece"
                checked={anime.includes("One Piece")}
                onChange={(event) => handleAnimeChange(event)}
              />
              One Piece
            </label>
            <label>
              <input
                name="anime"
                type="checkbox"
                value="Solo Leveling"
                checked={anime.includes("Solo Leveling")}
                onChange={(event) => handleAnimeChange(event)}
              />
              Solo Leveling
            </label>
          </div>
        </div>

        {/* PRICE RANGE FILTER GROUP */}
        <div className="filter-group">
          <h3>Price Range</h3>
          <div className="filter-options">
            <label>
              <input
                name="price-range"
                type="checkbox"
                value="$0 - $25"
                checked={priceRange.includes("$0 - $25")}
                onChange={(event) => handlePriceRangeChange(event)}
              />
              $0 - $25
            </label>
            <label>
              <input
                name="price-range"
                type="checkbox"
                value="$25 - $50"
                checked={priceRange.includes("$25 - $50")}
                onChange={(event) => handlePriceRangeChange(event)}
              />
              $25 - $50
            </label>
            <label>
              <input
                name="price-range"
                type="checkbox"
                value="$50 - $100"
                checked={priceRange.includes("$50 - $100")}
                onChange={(event) => handlePriceRangeChange(event)}
              />
              $50 - $100
            </label>
            <label>
              <input
                name="price-range"
                type="checkbox"
                value="$100 - $150"
                checked={priceRange.includes("$100 - $150")}
                onChange={(event) => handlePriceRangeChange(event)}
              />
              $100 - $150
            </label>
            <label>
              <input
                name="price-range"
                type="checkbox"
                value="Over $150"
                checked={priceRange.includes("Over $150")}
                onChange={(event) => handlePriceRangeChange(event)}
              />
              Over $150
            </label>
          </div>
        </div>
      </div>

      {/* FILTER FOOTER */}
      <div className={`filter-footer ${hasFilter ? "" : "hide"}`}>
        <button onClick={clearFilter}>{`Clear (${filterCount})`}</button>
        <button className="primary-button" onClick={() => toggleFilter(false)}>
          Apply
        </button>
      </div>
    </div>
  );
}
