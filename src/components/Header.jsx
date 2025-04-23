import "../styles.css";
import { useState, useContext } from "react";
import SelectedShoeContext from "../context/SelectedShoeContext";
import ShoeCard from "./ShoeCard";

export default function Header({ shoes, category }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState();
  const [subMenu, setSubMenu] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const { setSelectedShoe } = useContext(SelectedShoeContext);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const toggleSearch = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const toggleSubMenu = (selectedSubMenu) => {
    setSubMenu(selectedSubMenu);
    setSubMenuIsOpen(!subMenuIsOpen);
  };

  const closeMenu = () => {
    setMenuIsOpen(!menuIsOpen);
    setSubMenuIsOpen(!setSubMenuIsOpen);
  };

  const closeSubMenu = () => {
    setSubMenuIsOpen(!subMenuIsOpen);
  };

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

  return (
    <div>
      <div className="header">
        {/* LOGO */}
        <div className="logo">
          <a href="/">
            <img src="logo/header-logo.png" alt="Shonen Kicks" />
          </a>
        </div>

        {/* TOP BUTTONS */}
        <div className="top-buttons">
          <button className="icons" onClick={toggleSearch}>
            <img src="icons/search-all.png" alt="Search" />
          </button>

          <button className="icons">
            <img src="icons/user.png" alt="User" />
          </button>

          <button className="icons">
            <img src="icons/shopping-basket.png" alt="Search" />
          </button>

          <button className="icons" onClick={toggleMenu}>
            <img src="icons/menu.png" alt="Menu" />
          </button>
        </div>
      </div>

      {/* MAIN MENU */}
      <div className={`menu-container ${menuIsOpen ? "active" : ""}`}>
        <div className="close-btn-wrapper">
          <button className="close-menu-button" onClick={toggleMenu}>
            <img src="icons/close.png" alt="Close Menu" />
          </button>
        </div>

        <div className="menu">
          <button
            onClick={() => {
              category("New Releases");
              setSelectedShoe(null);
              toggleMenu();
            }}
          >
            New Releases
          </button>
          <button onClick={() => toggleSubMenu("Men")}>
            Men <img src="icons/chevron-right.png" alt="Men" />
          </button>
          <button onClick={() => toggleSubMenu("Women")}>
            Women <img src="icons/chevron-right.png" alt="Women" />
          </button>
          <button onClick={() => toggleSubMenu("Kids")}>
            Kids <img src="icons/chevron-right.png" alt="Kids" />
          </button>
          <button
            onClick={() => {
              category("Best Sellers");
              setSelectedShoe(null);
              toggleMenu();
            }}
          >
            Best Sellers
          </button>
          <button
            onClick={() => {
              category("Kicks On Sale");
              setSelectedShoe(null);
              toggleMenu();
            }}
          >
            Shop All Sale
          </button>
        </div>

        {/* SUB MENU */}
        <div className={`menu-container ${subMenuIsOpen ? "active" : ""}`}>
          <div className="close-btn-wrapper">
            <button className="close-menu-button" onClick={closeMenu}>
              <img src="icons/close.png" alt="Close Menu" />
            </button>
            <button className="back-to-main-menu" onClick={closeSubMenu}>
              <img src="icons/chevron-left.png" alt="Main Menu" />
              All
            </button>
          </div>
          <div className="menu">
            <button
              onClick={() => {
                category(`${subMenu} Kicks`);
                closeMenu();
              }}
            >
              {subMenu}
            </button>
            <div className="sub-menu">
              <button
                onClick={() => {
                  category(
                    `${subMenu}${subMenu !== "Kids" ? "'s" : "'"} Kicks`
                  );
                  setSelectedShoe(null);
                  closeMenu();
                }}
              >
                Shop All
              </button>
              <button
                onClick={() => {
                  category(
                    `${subMenu}${subMenu !== "Kids" ? "'s" : "'"} new releases`
                  );
                  setSelectedShoe(null);
                  closeMenu();
                }}
              >
                Latest Drops
              </button>
              <button
                onClick={() => {
                  category(
                    `${subMenu}${subMenu !== "Kids" ? "'s" : "'"} Best Sellers`
                  );
                  setSelectedShoe(null);
                  closeMenu();
                }}
              >
                Best Sellers
              </button>
              <button
                onClick={() => {
                  category(
                    `${subMenu}${subMenu !== "Kids" ? "'s" : "'"} On Sale`
                  );
                  setSelectedShoe(null);
                  closeMenu();
                }}
              >
                On Sale
              </button>
            </div>
          </div>
        </div>

        {/* MENU FOOTER */}
        <div className="menu-footer">
          <img src="logo/shonenkicks.png" alt="Shonen Kicks" />
          <p>Log in to pick up where you left off!</p>
          <div className="menu-footer-btn-wrapper">
            <button className="primary-button">Login</button>
            <button>Sign In</button>
          </div>
        </div>
      </div>

      {/* SEARCH ALL */}
      <div className={`search-container ${searchIsOpen ? "active" : ""}`}>
        <div className="search-head">
          <div className="search-all">
            <img src="icons/search-all.png" alt="Search" />
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="cancel-search-btn" onClick={toggleSearch}>
            Cancel
          </button>
        </div>

        {/* SEARCH RESULTS - ONLY SHOWS UP IF THERE IS VALUE */}
        {searchTerm && (
          <div>
            <p className="top-results">Top Results</p>
            <div className="shoes-grid">
              {firstSixResults.map((shoe) => (
                <div onClick={toggleSearch} key={shoe.id}>
                  <ShoeCard key={shoe.id} shoe={shoe}></ShoeCard>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
