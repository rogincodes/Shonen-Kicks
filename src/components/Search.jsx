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

  // Used to limit the number of results shown in the search results
  const firstSixResults = filteredShoes.slice(0, 8);

  // This effect runs when the search is opened and focuses the input field
  useEffect(() => {
    if (searchIsOpen) {
      searchInputRef.current.focus();
    }
  }, [searchIsOpen]);

  return (
    <div>
      {renderSearch && (
        <div
          className={`search-container ${
            searchIsOpen ? "fade-scale-in" : "fade-scale-out"
          }`}
        >
          <div className="search-head">
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
              <div className="shoes-grid">
                {firstSixResults.map((shoe) => (
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
