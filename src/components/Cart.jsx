import "../styles.css";
import { useState, useEffect } from "react";

export default function Cart({ cartIsOpen, toggleCart, renderCart }) {
  const [cartItems, setCartItems] = useState([]);

  const temporaryOrder = () => {
    // Simulate an order being placed
    const order = [
      {
        id: 1,
        name: "Mob Psychic Fury",
        price: 10,
        image: "./shoes/mob1.png",
        size: "US 10",
        quantity: 1,
      },
      {
        id: 2,
        name: "Cha Hae-In Light Dashes",
        price: 20,
        image: "./shoes/hae-in1.png",
        size: "US 10",
        quantity: 1,
      },
    ];

    setCartItems(order);
  };

  useEffect(() => {
    temporaryOrder();
  }, []);

  return (
    <div>
      {renderCart && (
        <div
          className={`cart-panel ${
            cartIsOpen ? "slide-in-left" : "slide-out-left"
          }`}
        >
          <div className="cart-header">
            <h2>CART</h2>
            <button
              className="close-cart-panel"
              onClick={() => toggleCart(false)}
            >
              <img src="icons/close.png" alt="Close Cart" />
            </button>
          </div>

          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name.toUpperCase()}</h3>
                    <p>{item.size}</p>
                    <p>${item.price}</p>
                    <div className="quantity-and-remove">
                      <div className="quantity-selector">
                        <button>−</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button>+</button>
                      </div>
                      <button className="remove-item">REMOVE</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div className="cart-summary">
            <p>Subtotal</p>
            <p>$30</p>
          </div>

          <p className="cart-headsup">
            Shipping and taxes calculated at checkout
          </p>
        </div>
      )}
    </div>
  );
}
