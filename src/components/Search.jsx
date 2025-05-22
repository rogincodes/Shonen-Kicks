import { useState, useEffect, useRef } from "react";
import "../styles.css";
import ShoeCard from "./ShoeCard";

export default function Search({
  shoes,
  searchIsOpen,
  toggleSearch,
  renderSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [topResults, setTopResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // This function checks if the shoe name or anime name matches the search term
  const matchesSearchTerm = (shoe, searchTerm) => {
    return (
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shoe.anime.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // This variable holds the filtered shoes based on the search term
  const filteredShoes = shoes.filter((shoe) => {
    return matchesSearchTerm(shoe, searchTerm);
  });

  useEffect(() => {
    // focuses the input field
    if (searchIsOpen) {
      searchInputRef.current.focus();
    }
    // Used to limit the number of results shown in the search results
    var limitedResults = [];
    if (width >= 1024 && width < 1280) {
      limitedResults = filteredShoes.slice(0, 4);
    } else if (width >= 1280) {
      limitedResults = filteredShoes.slice(0, 5);
    } else {
      limitedResults = filteredShoes.slice(0, 6);
    }
    setTopResults(limitedResults);
  }, [searchIsOpen, width, searchTerm]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div>
      {renderSearch && (
        <div
          className={`search-container ${
            searchIsOpen ? "fade-scale-in" : "fade-scale-out"
          }`}
        >
          <div className="search-head">
            {width >= 1024 && (
              <div className="logo">
                <a href="https://rogincodes.github.io/Shonen-Kicks/">
                  <img src="logos/header-logo.png" alt="Shonen Kicks" />
                </a>
              </div>
            )}
            <div className="search-all">
              <img src="icons/search-all.png" alt="Search" />
              <input
                id="search-input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                ref={searchInputRef}
              />
            </div>
            <button
              className="cancel-search-btn"
              onClick={() => toggleSearch(false)}
            >
              Cancel
            </button>
          </div>

          {/* SEARCH RESULTS - ONLY SHOWS UP IF THERE IS VALUE */}
          {searchTerm && (
            <div className="search-results">
              <p className="top-results">Top Results</p>
              <div className="shoes-grid grid-wrap">
                {topResults.map((shoe) => (
                  <div onClick={() => toggleSearch(false)} key={shoe.id}>
                    <ShoeCard key={shoe.id} shoe={shoe}></ShoeCard>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
