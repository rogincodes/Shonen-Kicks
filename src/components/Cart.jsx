import "../styles.css";
import { useState, useEffect, useContext } from "react";
import CartItemsContext from "../context/CartItemsContext";

export default function Cart({ cartIsOpen, toggleCart, renderCart }) {
  const { order, setOrder } = useContext(CartItemsContext);
  const [loadingIndex, setLoadingIndex] = useState(null); // track which input is loading
  const [subtotal, setSubtotal] = useState(0);

  const handleQuantityChange = (index, event) => {
    // Just display the quantity but will change it on blur
    const userOrder = [...order];
    userOrder[index].quantity = parseInt(event.target.value, 10);
    setOrder(userOrder); // not permanent yet
    const newQuantity = parseInt(event.target.value, 10);
    console.log(`Changing quantity for index ${index} to ${newQuantity}`);
  };

  const handleSubtract = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1;
    } else {
      updatedOrder[index].quantity = 1; // prevent going below 1
    }
    setOrder(updatedOrder);
  };

  const handleAdd = (index) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    if (updatedOrder[index].quantity > 10) {
      updatedOrder[index].quantity = 10; // prevent going above 10
    }
    setOrder(updatedOrder);
  };

  const computeTotal = () => {
    const active = document.activeElement;
    if (active && active.classList.contains("quantity-input")) {
      return; // Skip computing if quantity input is focused
    }

    const total = order.reduce((sum, item) => {
      if (item.onSale) {
        return sum + item.quantity * item.salePrice;
      } else {
        return sum + item.quantity * item.price;
      }
    }, 0); // sum initial value here

    const formattedTotal = total.toLocaleString();
    setSubtotal(formattedTotal);
  };

  const handleBlur = (index, event) => {
    setLoadingIndex(index); // show loading spinner first
    const finalQuantityUpdate = () => {
      const updatedOrder = [...order];
      updatedOrder[index].quantity = parseInt(event.target.value, 10);
      if (updatedOrder[index].quantity < 1) {
        updatedOrder[index].quantity = 1;
      } else if (updatedOrder[index].quantity > 10) {
        updatedOrder[index].quantity = 10;
      } else if (isNaN(updatedOrder[index].quantity)) {
        updatedOrder[index].quantity = 1;
      } else {
        updatedOrder[index].quantity = parseInt(event.target.value, 10);
      }
      setOrder(updatedOrder); // update the order after validation
    };

    // simulate delay for "loading"
    setTimeout(() => {
      finalQuantityUpdate();
      computeTotal();
      setLoadingIndex(null); // hide loading spinner after delay
    }, 500);
  };

  const handleRemove = (index) => {
    setLoadingIndex(index); // show loading spinner first
    const updatedOrder = [...order];
    updatedOrder.splice(index, 1);

    // simulate delay for "loading"
    setTimeout(() => {
      setOrder(updatedOrder);
      setLoadingIndex(null); // hide loading spinner after delay
    }, 500);
  };

  useEffect(() => {
    computeTotal();
  }, [order]);

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
            {order.length > 0 ? (
              order.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p>{item.size}</p>
                    <div className="price-container">
                      <p className={`${item.onSale ? "markdown" : ""}`}>
                        ${item.price}
                      </p>
                      <p className={`sale-price ${item.onSale ? "" : "hide"}`}>
                        ${item.salePrice}
                      </p>
                    </div>
                    <div className="quantity-and-remove">
                      <div className="quantity-selector">
                        <button
                          onClick={(event) => {
                            handleSubtract(index);
                            event.target.blur();
                          }}
                        >
                          −
                        </button>
                        <input
                          key={index}
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            handleQuantityChange(index, event)
                          }
                          onBlur={(event) => handleBlur(index, event)}
                          disabled={loadingIndex === index} // disables the input while loading
                          className="quantity-input"
                        />
                        <button
                          onClick={(event) => {
                            handleAdd(index);
                            event.target.blur();
                          }}
                        >
                          +
                        </button>
                      </div>
                      {loadingIndex === index && (
                        <div
                          className={`spinner ${
                            loadingIndex === index ? "show" : ""
                          }`}
                        />
                      )}
                      <button
                        className="remove-item"
                        onClick={() => handleRemove(index)}
                      >
                        REMOVE
                      </button>
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
            <p className="subtotal">${subtotal}</p>
          </div>

          <p className="cart-headsup">
            Shipping and taxes calculated at checkout
          </p>

          <div className="payment">
            <button className="checkout">
              <p>CHECKOUT &emsp;</p>
              <p className="middle-dot">·</p>
              <p className="subtotal">&emsp; ${subtotal}</p>
            </button>
            <button>
              <img
                src="logos/paypal.png"
                alt="PayPal"
                className="paypal-logo"
              />
            </button>
            <button>
              <img
                src="logos/google-pay.png"
                alt="Google Pay"
                className="g-pay-logo"
              />
            </button>
            <button>
              <img src="logos/gcash.png" alt="Gcash" className="gcash-logo" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
