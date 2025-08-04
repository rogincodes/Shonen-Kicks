import "../styles.css";
import { useState, useEffect, useContext } from "react";
import Search from "./Search";
import Cart from "./Cart";
import Login from "./Login";
import Menu from "./Menu";
import SelectedShoeContext from "../context/SelectedShoeContext";
import CartItemsContext from "../context/CartItemsContext";

export default function Header({ shoes, category }) {
  const [categorySelected, setCategorySelected] = useState("NEW RELEASES");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [renderSearch, setRenderSearch] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [renderCart, setRenderCart] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [renderLogin, setRenderLogin] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { setSelectedShoe } = useContext(SelectedShoeContext);
  const { order } = useContext(CartItemsContext);

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

  const toggleDropdown = () => {
    setActiveDropdown(null);
  };

  const setCategory = () => {
    category(categorySelected);
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  });

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
    <div className="header-container">
      <div className="header">
        <div className="head-menu">
          {/* LOGO */}
          <div className="logo">
            <a href="https://shonen-kicks.vercel.app/">
              <img src="logos/header-logo.png" alt="Shonen Kicks" />
            </a>
          </div>

          {width >= 1024 && (
            <div className="categories-wrapper">
              <nav>
                <ul>
                  <li className="menu-item border-bot">
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("new releases");
                        setSelectedShoe(null);
                      }}
                    >
                      &nbsp;NEW RELEASES&nbsp;
                    </button>
                  </li>
                  <li
                    className="menu-item"
                    onMouseEnter={() => setActiveDropdown("men")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("men's kicks");
                        setSelectedShoe(null);
                      }}
                    >
                      MEN
                    </button>
                    {activeDropdown === "men" && (
                      <div className="dropdown">
                        <button
                          onClick={(e) => {
                            category("men's new releases");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Latest Drops
                        </button>
                        <button
                          onClick={() => {
                            category("men's best sellers");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Best Sellers
                        </button>
                        <button
                          onClick={() => {
                            category("men's on sale");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          On Sale
                        </button>
                      </div>
                    )}
                  </li>
                  <li
                    className="menu-item"
                    onMouseEnter={() => setActiveDropdown("women")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("women's kicks");
                        setSelectedShoe(null);
                      }}
                    >
                      WOMEN
                    </button>
                    {activeDropdown === "women" && (
                      <div className="dropdown">
                        <button
                          onClick={() => {
                            category("women's new releases");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Latest Drops
                        </button>
                        <button
                          onClick={() => {
                            category("women's best sellers");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Best Sellers
                        </button>
                        <button
                          onClick={() => {
                            category("women's on sale");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          On Sale
                        </button>
                      </div>
                    )}
                  </li>
                  <li
                    className="menu-item"
                    onMouseEnter={() => setActiveDropdown("kids")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("kids' kicks");
                        setSelectedShoe(null);
                      }}
                    >
                      KIDS
                    </button>
                    {activeDropdown === "kids" && (
                      <div className="dropdown">
                        <button
                          onClick={() => {
                            category("kids' new releases");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Latest Drops
                        </button>
                        <button
                          onClick={() => {
                            category("kids' best sellers");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          Best Sellers
                        </button>
                        <button
                          onClick={() => {
                            category("kids' on sale");
                            toggleDropdown();
                            setSelectedShoe(null);
                          }}
                        >
                          On Sale
                        </button>
                      </div>
                    )}
                  </li>
                  <li className="menu-item border-bot">
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("best sellers");
                        setSelectedShoe(null);
                      }}
                    >
                      &nbsp;BEST SELLERS&nbsp;
                    </button>
                  </li>
                  <li className="menu-item border-bot">
                    <button
                      className="menu-link"
                      onClick={() => {
                        category("kicks on sale");
                        setSelectedShoe(null);
                      }}
                    >
                      &nbsp;SHOP ALL SALE&nbsp;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          {/* HEADER BUTTONS */}
          <div className="top-buttons">
            <button className="icons" onClick={toggleSearch}>
              <img src="icons/search-all.png" alt="Search" />
            </button>

            {searchIsOpen && (
              <div className="backdrop" onClick={toggleSearch}></div>
            )}

            <button className="icons" onClick={toggleLogin}>
              <img src="icons/user.png" alt="User" />
            </button>

            <button className="icons" onClick={toggleCart}>
              <img
                src={`${
                  order.length === 0
                    ? "icons/shopping-basket-empty.png"
                    : "icons/shopping-basket-not-empty.png"
                }`}
                alt="Search"
                className={`${order.length === 0 ? "" : "cart-image"}`}
              />
            </button>

            {cartIsOpen && (
              <div className="backdrop" onClick={toggleCart}></div>
            )}

            {width < 1024 && (
              <button className="icons" onClick={toggleMenu}>
                <img src="icons/menu.png" alt="Menu" />
              </button>
            )}

            <div
              className={`overlay ${menuIsOpen ? "show" : ""}`}
              onClick={toggleMenu}
            ></div>
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
    </div>
  );
}
