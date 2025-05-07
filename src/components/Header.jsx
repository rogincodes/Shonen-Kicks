import "../styles.css";
import { useState, useEffect } from "react";
import Search from "./Search";
import Cart from "./Cart";
import Login from "./Login";
import Menu from "./Menu";

export default function Header({ shoes, category }) {
  const [categorySelected, setCategorySelected] = useState("NEW RELEASES");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [renderSearch, setRenderSearch] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [renderCart, setRenderCart] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [renderLogin, setRenderLogin] = useState(false);

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

  const toggleLogin = () => {
    setLoginIsOpen(!loginIsOpen);
    if (loginIsOpen) {
      setLoginIsOpen(false); // triggers slide-down
      setTimeout(() => setRenderLogin(false), 500); // unmount after animation
    } else {
      setRenderLogin(true); // mount first
      setLoginIsOpen(true); // then trigger slide-up
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

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const setCategory = () => {
    category(categorySelected);
  };

  useEffect(() => {
    setCategory();
  }, [categorySelected]);

  useEffect(() => {
    if (searchIsOpen || loginIsOpen || cartIsOpen || menuIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      // In case component unmounts
      document.body.style.overflow = "";
    };
  }, [searchIsOpen, loginIsOpen, cartIsOpen, menuIsOpen]);

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

          <button className="icons" onClick={toggleLogin}>
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

      {/* SEARCH */}
      <Search
        shoes={shoes}
        searchIsOpen={searchIsOpen}
        toggleSearch={(toggle) => setSearchIsOpen(toggle)}
        renderSearch={renderSearch}
      ></Search>

      {/* LOGIN */}
      <Login
        loginIsOpen={loginIsOpen}
        toggleLogin={(toggle) => setLoginIsOpen(toggle)}
        renderLogin={renderLogin}
      ></Login>

      {/* CHECKOUT */}
      <Cart
        cartIsOpen={cartIsOpen}
        toggleCart={(toggle) => setCartIsOpen(toggle)}
        renderCart={renderCart}
      ></Cart>

      {/* MAIN MENU */}
      <Menu
        category={(category) => setCategorySelected(category)}
        menuIsOpen={menuIsOpen}
        toggleMenu={(toggle) => setMenuIsOpen(toggle)}
        toggleLogin={() => toggleLogin()}
      ></Menu>
    </div>
  );
}
