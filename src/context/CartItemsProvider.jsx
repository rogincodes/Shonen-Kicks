import CartItemsContext from "./CartItemsContext";
import { useState } from "react";

export const CartItemsProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  return (
    // Provide the cart items context to the app
    <CartItemsContext.Provider value={{ order, setOrder }}>
      {children}
    </CartItemsContext.Provider>
  );
};
