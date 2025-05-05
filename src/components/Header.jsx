import "../styles.css";
import { useState, useContext } from "react";
import SelectedShoeContext from "../context/SelectedShoeContext";
import Search from "./Search";
import Cart from "./Cart";
import { render } from "@testing-library/react";

export default function Header({ shoes, category }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState();
  const [subMenu, setSubMenu] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const { setSelectedShoe } = useContext(SelectedShoeContext);
  const [renderSearch, setRenderSearch] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [renderCart, setRenderCart] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const toggleSearch = () => {
    setSearchIsOpen(true);
    if (searchIsOpen) {
      setSearchIsOpen(false); // triggers fade-out
      setTimeout(() => setRenderSearch(false), 400); // unmount after fade-out
    } else {
      setRenderSearch(true); // mount first
      setSearchIsOpen(true); // then trigger fade-in
    }
  };

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
    if (cartIsOpen) {
      setCartIsOpen(false); // triggers slide-out
      setTimeout(() => setRenderCart(false), 400); // unmount after slide-out
    } else {
      setRenderCart(true); // mount first
      setCartIsOpen(true); // then trigger slide-in
    }
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
        {/* LOGO */}
        <div className="logo">
          <a href="https://rogincodes.github.io/Shonen-Kicks/">
            <img src="logos/header-logo.png" alt="Shonen Kicks" />
          </a>
        </div>

        {/* HEADER BUTTONS */}
        <div className="top-buttons">
          <button className="icons" onClick={toggleSearch}>
            <img src="icons/search-all.png" alt="Search" />
          </button>

          <button className="icons">
            <img src="icons/user.png" alt="User" />
          </button>

          <button className="icons" onClick={toggleCart}>
            <img src="icons/shopping-basket.png" alt="Search" />
          </button>

          {cartIsOpen && <div className="backdrop" onClick={toggleCart}></div>}

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
          <img src="logos/shonenkicks.png" alt="Shonen Kicks" />
          <p>Log in to pick up where you left off!</p>
          <div className="menu-footer-btn-wrapper">
            <button className="primary-button">Login</button>
            <button>Sign In</button>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <Search
        shoes={shoes}
        searchIsOpen={searchIsOpen}
        toggleSearch={(toggle) => setSearchIsOpen(toggle)}
        renderSearch={renderSearch}
      ></Search>

      {/* CHECKOUT */}
      <Cart
        cartIsOpen={cartIsOpen}
        toggleCart={(toggle) => setCartIsOpen(toggle)}
        renderCart={renderCart}
      ></Cart>
    </div>
  );
}
