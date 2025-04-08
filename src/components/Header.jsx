import "../styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ category }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState();
  const [subMenu, setSubMenu] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);

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

  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src="logo/header-logo.png" alt="Shonen Kicks" />
        </div>

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
              toggleMenu();
            }}
          >
            Best Sellers
          </button>
          <button
            onClick={() => {
              category("Kicks On Sale");
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
                  closeMenu();
                }}
              >
                On Sale
              </button>
            </div>
          </div>
        </div>

        <div className="menu-footer">
          <img src="logo/shonenkicks.png" alt="Shonen Kicks" />
          <p>Log in to pick up where you left off!</p>
          <div className="menu-footer-btn-wrapper">
            <button className="primary-button">Login</button>
            <button>Sign In</button>
          </div>
        </div>
      </div>

      <div className={`search-container ${searchIsOpen ? "active" : ""}`}>
        <div className="search-head">
          <div className="search-all">
            <img src="icons/search-all.png" alt="Search" />
            <input type="text" placeholder="Search" />{" "}
          </div>
          <button onClick={toggleSearch}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
