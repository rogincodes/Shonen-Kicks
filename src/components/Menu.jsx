import "../styles.css";
import { useState, useContext } from "react";
import SelectedShoeContext from "../context/SelectedShoeContext";

export default function Menu({ category, menuIsOpen, toggleMenu }) {
  const { setSelectedShoe } = useContext(SelectedShoeContext);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState("");

  const toggleSubMenu = (selectedSubMenu) => {
    setSubMenu(selectedSubMenu);
    setSubMenuIsOpen(!subMenuIsOpen);
  };

  return (
    <div className={`menu-container ${menuIsOpen ? "active" : ""}`}>
      <div className="close-btn-wrapper">
        <button className="close-menu-button" onClick={() => toggleMenu(false)}>
          <img src="icons/close.png" alt="Close Menu" />
        </button>
      </div>

      <div className="menu">
        <button
          onClick={() => {
            category("New Releases");
            setSelectedShoe(null);
            toggleMenu(false);
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
            toggleMenu(false);
          }}
        >
          Best Sellers
        </button>
        <button
          onClick={() => {
            category("Kicks On Sale");
            setSelectedShoe(null);
            toggleMenu(false);
          }}
        >
          Shop All Sale
        </button>
      </div>

      {/* SUB MENU */}
      <div className={`menu-container ${subMenuIsOpen ? "active" : ""}`}>
        <div className="close-btn-wrapper">
          <button
            className="close-menu-button"
            onClick={() => {
              toggleMenu(false);
              setSubMenuIsOpen(false);
            }}
          >
            <img src="icons/close.png" alt="Close Menu" />
          </button>
          <button
            className="back-to-main-menu"
            onClick={() => setSubMenuIsOpen(false)}
          >
            <img src="icons/chevron-left.png" alt="Main Menu" />
            All
          </button>
        </div>
        <div className="menu">
          <button
            onClick={() => {
              category(`${subMenu} Kicks`);
              toggleMenu(false);
              setSubMenuIsOpen(false);
            }}
          >
            {subMenu}
          </button>
          <div className="sub-menu">
            <button
              onClick={() => {
                category(`${subMenu}${subMenu !== "Kids" ? "'s" : "'"} Kicks`);
                setSelectedShoe(null);
                toggleMenu(false);
                setSubMenuIsOpen(false);
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
                toggleMenu(false);
                setSubMenuIsOpen(false);
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
                toggleMenu(false);
                setSubMenuIsOpen(false);
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
                toggleMenu(false);
                setSubMenuIsOpen(false);
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
  );
}
