import { createContext, useReducer, useContext } from "react";
import {
  ADD_TO_CART,
  CART_TOTAL_ITEM_PRICE,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_ITEM,
} from "../constants/constants";
import reducer from "../reducers/CartReducer";
import { useEffect } from "react";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("cart");
  if (localCartData.length === 0) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, selectedColor, quantity, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, selectedColor, quantity, product },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const incrementQuantity = (id) => {
    dispatch({
      type: INCREMENT_QUANTITY,
      payload: id,
    });
  };

  const decrementQuantity = (id) => {
    dispatch({
      type: DECREMENT_QUANTITY,
      payload: id,
    });
  };

  useEffect(() => {
    dispatch({
      type: CART_TOTAL_ITEM_PRICE,
    });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
