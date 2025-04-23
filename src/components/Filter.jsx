import { useState, useEffect, useMemo } from "react";
import "../styles.css";

export default function Filter({ shoes, shoeResults }) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState([]);
  const [kids, setKids] = useState([]);
  const [anime, setAnime] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filtersSelected, setFiltersSelected] = useState([]);
  const [sort, setSort] = useState("Date, new to old");

  const toggleFilter = () => {
    setFilterIsOpen(!filterIsOpen);
  };

  const toggleFilterFooter = (count) => {
    count > 0 ? setHasFilter(true) : setHasFilter(false);
  };

  // This function counts the number of selected filters and updates the filter count state
  const countFilters = () => {
    let count = gender.length + kids.length + anime.length + priceRange.length;
    setFilterCount(count);
    toggleFilterFooter(count);
  };

  // This function sets the selected filters to be displayed
  const showFilters = () => {
    let selectedFilters = [...gender, ...kids, ...anime, ...priceRange];
    setFiltersSelected(selectedFilters);
  };

  // This function removes a filter from the selected filters and updates the state accordingly
  const removeFilter = (filter) => {
    let selectedFilters = filtersSelected.filter((prevFilter) => {
      return prevFilter != filter;
    });
    setFiltersSelected(selectedFilters);
    if (gender.includes(filter)) {
      setGender((prev) => prev.filter((g) => g !== filter));
    } else if (kids.includes(filter)) {
      setKids((prev) => prev.filter((k) => k !== filter));
    } else if (anime.includes(filter)) {
      setAnime((prev) => prev.filter((a) => a !== filter));
    } else {
      setPriceRange((prev) => prev.filter((p) => p !== filter));
    }
  };

  useEffect(() => {
    countFilters();
    showFilters();
  }, [gender, kids, anime, priceRange]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const matchesSearchTerm = (shoe, searchTerm) => {
    return (
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shoe.anime.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const matchesGender = (shoe, gender) => {
    return (
      gender.length === 0 ||
      gender.some(
        (gender) => shoe.gender.toLowerCase() === gender.toLowerCase()
      )
    );
  };

  const matchesKids = (shoe, kids) => {
    if (shoe.kids) {
      return (
        kids.length === 0 ||
        kids.some((kid) => shoe.gender.toLowerCase() === kid.toLowerCase())
      );
    } else return kids.length === 0;
  };

  const matchesAnime = (shoe, anime) => {
    return (
      anime.length === 0 ||
      anime.some((anime) => shoe.anime.toLowerCase() === anime.toLowerCase())
    );
  };

  const matchesPriceRange = (shoe, priceRange) => {
    return (
      priceRange.length === 0 ||
      priceRange.some((priceRange) => {
        switch (priceRange) {
          case "$0 - $25":
            return shoe.price >= 0 && shoe.price <= 25;
          case "$25 - $50":
            return shoe.price >= 25 && shoe.price <= 50;
          case "$50 - $100":
            return shoe.price >= 50 && shoe.price <= 100;
          case "$100 - $150":
            return shoe.price >= 100 && shoe.price <= 150;
          case "Over $150":
            return shoe.price > 150;
        }
      })
    );
  };

  // Clear all filters and reset the state
  const clearFilter = () => {
    setGender([]);
    setKids([]);
    setAnime([]);
    setPriceRange([]);
  };

  // This variable holds the filtered shoes based on the selected filters
  const filteredShoes = shoes.filter((shoe) => {
    return (
      matchesGender(shoe, gender) &&
      matchesKids(shoe, kids) &&
      matchesAnime(shoe, anime) &&
      matchesPriceRange(shoe, priceRange) &&
      matchesSearchTerm(shoe, searchTerm)
    );
  });

  // This variable holds the sorted shoes based on the selected sort option
  // It uses useMemo to optimize performance by memoizing the result
  const sortedShoes = useMemo(() => {
    let sorted = [...filteredShoes];
    switch (sort) {
      case "Date, new to old":
        return sorted.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
      case "Date, old to new":
        return sorted.sort(
          (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
        );
      case "Alphabetically, A-Z":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically, Z-A":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "Price, low to high":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [sort, filteredShoes]);

  useEffect(() => {
    shoeResults((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(sortedShoes)) {
        return prev; // Prevent re-setting if data is the same
      }
      return sortedShoes;
    });
  }, [sort, filteredShoes]);

  return (
    <div>
      {/* OPTIONS CONTAINER */}
      <div className="options-container">
        {/* SEARCH */}
        <div className="search">
          <img src="icons/search.png" alt="Search" />
          <input
            id="search"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* FILTER */}
        <div>
          <button className="filter-button" onClick={toggleFilter}>
            <img src="icons/filter.png" alt="" />
            Filter By
          </button>

          {filterIsOpen && (
            <div className="overlay" onClick={toggleFilter}></div>
          )}
        </div>

        {/* FILTER CONTENT */}
        <div className={`filter-container ${filterIsOpen ? "active" : ""}`}>
          <button className="close-filter-button" onClick={toggleFilter}>
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
                    onChange={handleGenderChange}
                  />
                  Men
                </label>
                <label>
                  <input
                    name="gender"
                    type="checkbox"
                    value="Women"
                    checked={gender.includes("Women")}
                    onChange={handleGenderChange}
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
                    onChange={handleKidsChange}
                  />
                  Boys
                </label>
                <label>
                  <input
                    name="kids"
                    type="checkbox"
                    value="Girls"
                    checked={kids.includes("Girls")}
                    onChange={handleKidsChange}
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
                    onChange={handleAnimeChange}
                  />
                  Attack on Titan
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Black Clover"
                    checked={anime.includes("Black Clover")}
                    onChange={handleAnimeChange}
                  />
                  Black Clover
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Bleach"
                    checked={anime.includes("Bleach")}
                    onChange={handleAnimeChange}
                  />
                  Bleach
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Demon Slayer"
                    checked={anime.includes("Demon Slayer")}
                    onChange={handleAnimeChange}
                  />
                  Demon Slayer
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Dragon Ball"
                    checked={anime.includes("Dragon Ball")}
                    onChange={handleAnimeChange}
                  />
                  Dragon Ball
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Fairy Tail"
                    checked={anime.includes("Fairy Tail")}
                    onChange={handleAnimeChange}
                  />
                  Fairy Tail
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Haikyuu!!"
                    checked={anime.includes("Haikyuu!!")}
                    onChange={handleAnimeChange}
                  />
                  Haikyuu!!
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Hunter x Hunter"
                    checked={anime.includes("Hunter x Hunter")}
                    onChange={handleAnimeChange}
                  />
                  Hunter x Hunter
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Jujutsu Kaisen"
                    checked={anime.includes("Jujutsu Kaisen")}
                    onChange={handleAnimeChange}
                  />
                  Jujutsu Kaisen
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Kuroko no Basket"
                    checked={anime.includes("Kuroko no Basket")}
                    onChange={handleAnimeChange}
                  />
                  Kuroko no Basket
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Mob Psycho 100"
                    checked={anime.includes("Mob Psycho 100")}
                    onChange={handleAnimeChange}
                  />
                  Mob Psycho 100
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Naruto"
                    checked={anime.includes("Naruto")}
                    onChange={handleAnimeChange}
                  />
                  Naruto
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="One Piece"
                    checked={anime.includes("One Piece")}
                    onChange={handleAnimeChange}
                  />
                  One Piece
                </label>
                <label>
                  <input
                    name="anime"
                    type="checkbox"
                    value="Solo Leveling"
                    checked={anime.includes("Solo Leveling")}
                    onChange={handleAnimeChange}
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
                    onChange={handlePriceRangeChange}
                  />
                  $0 - $25
                </label>
                <label>
                  <input
                    name="price-range"
                    type="checkbox"
                    value="$25 - $50"
                    checked={priceRange.includes("$25 - $50")}
                    onChange={handlePriceRangeChange}
                  />
                  $25 - $50
                </label>
                <label>
                  <input
                    name="price-range"
                    type="checkbox"
                    value="$50 - $100"
                    checked={priceRange.includes("$50 - $100")}
                    onChange={handlePriceRangeChange}
                  />
                  $50 - $100
                </label>
                <label>
                  <input
                    name="price-range"
                    type="checkbox"
                    value="$100 - $150"
                    checked={priceRange.includes("$100 - $150")}
                    onChange={handlePriceRangeChange}
                  />
                  $100 - $150
                </label>
                <label>
                  <input
                    name="price-range"
                    type="checkbox"
                    value="Over $150"
                    checked={priceRange.includes("Over $150")}
                    onChange={handlePriceRangeChange}
                  />
                  Over $150
                </label>
              </div>
            </div>
          </div>

          {/* FILTER FOOTER */}
          <div className={`filter-footer ${hasFilter ? "" : "hide"}`}>
            <button onClick={clearFilter}>{`Clear (${filterCount})`}</button>
            <button className="primary-button" onClick={toggleFilter}>
              Apply
            </button>
          </div>
        </div>

        {/* SORT BAR */}
        <div className="sort-bar">
          <select
            name="sort"
            className="sort-dropdown"
            value={sort}
            onChange={handleSortChange}
          >
            <option>Alphabetically, A-Z</option>
            <option>Alphabetically, Z-A</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
            <option>Date, new to old</option>
            <option>Date, old to new</option>
          </select>
        </div>
      </div>

      {/* FILTERS SELECTED -> ONLY SHOWS UP WHENEVER THERE IS A FILTER */}
      <div className={`remove-selected ${hasFilter ? "show" : ""}`}>
        {filtersSelected.length > 1 && (
          <button onClick={clearFilter} className="clear-all-button">
            Clear All
          </button>
        )}
        {filtersSelected.map((filter, index) => (
          <div key={index}>
            <button
              className="remove-filter"
              onClick={() => removeFilter(filter)}
            >
              <span>{filter}</span>
              <span className="remove-x">✕</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
