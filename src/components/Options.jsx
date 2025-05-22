import { useState, useEffect, useMemo, useContext } from "react";
import "../styles.css";
import Filter from "./Filter";
import FiltersContext from "../context/FiltersContext";

export default function Options({ shoes, shoeResults }) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filtersSelected, setFiltersSelected] = useState([]);
  const [sort, setSort] = useState("Date, new to old");
  const [width, setWidth] = useState(window.innerWidth);
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
        return sorted.sort((a, b) => {
          const aPrice = a.onSale ? a.salePrice : a.price;
          const bPrice = b.onSale ? b.salePrice : b.price;
          return aPrice - bPrice;
        });
      case "Price, high to low":
        return sorted.sort((a, b) => {
          const aPrice = a.onSale ? a.salePrice : a.price;
          const bPrice = b.onSale ? b.salePrice : b.price;
          return bPrice - aPrice;
        });
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

  useEffect(() => {
    if (filterIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // In case component unmounts
      document.body.style.overflow = "";
    };
  }, [filterIsOpen]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div>
      <div className="options-container">
        {/* SEARCH */}
        <div className="search-bar">
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
        <div className={`filter-bar ${width >= 1024 ? "hide" : ""}`}>
          <button className="filter-button" onClick={toggleFilter}>
            <img src="icons/filter.png" alt="" />
            Filter By
          </button>

          <div
            className={`overlay ${filterIsOpen ? "show" : ""}`}
            onClick={toggleFilter}
          ></div>
        </div>

        {/* FILTER CONTENT */}
        {width < 1024 && (
          <Filter
            filterIsOpen={filterIsOpen}
            toggleFilter={(toggle) => setFilterIsOpen(toggle)}
            hasFilter={hasFilter}
            filterCount={filterCount}
            clearFilter={() => clearFilter()}
          ></Filter>
        )}

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
          {width >= 1024 && (
            <img src="icons/down.png" className="down-arrow-icon" />
          )}
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
