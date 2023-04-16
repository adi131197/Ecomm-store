import {
  ADD_TO_CART,
  CART_TOTAL_ITEM_PRICE,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_ITEM,
} from "../constants/constants";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let { id, selectedColor, quantity, product } = action.payload;

      let productAlreadyExist = state.cart.find(
        (curItem) => curItem.id === id + selectedColor
      );

      if (productAlreadyExist) {
        let updatedProducts = state.cart.map((curElem) => {
          if (curElem.id === id + selectedColor) {
            let newQuantity = curElem.quantity + quantity;

            if (newQuantity >= curElem.max) {
              newQuantity = curElem.max;
            }

            return {
              ...curElem,
              quantity: newQuantity,
            };
          } else {
            return curElem;
          }
        });

        return {
          ...state,
          cart: updatedProducts,
        };
      } else {
        let cartProduct = {
          id: id + selectedColor,
          name: product.name,
          selectedColor,
          quantity,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case REMOVE_ITEM:
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );

      return {
        ...state,
        cart: updatedCart,
      };

    case CLEAR_CART:
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...state,
        cart: [],
      };

    case INCREMENT_QUANTITY:
      let updatedIncProducts = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let IncQuantity = curElem.quantity + 1;

          if (IncQuantity >= curElem.max) {
            IncQuantity = curElem.max;
          }

          return {
            ...curElem,
            quantity: IncQuantity,
          };
        } else {
          return curElem;
        }
      });

      return {
        ...state,
        cart: updatedIncProducts,
      };

    case DECREMENT_QUANTITY:
      let updatedProducts = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decQuantity = curElem.quantity - 1;

          if (decQuantity <= 0) {
            decQuantity = 1;
          }

          return {
            ...curElem,
            quantity: decQuantity,
          };
        } else {
          return curElem;
        }
      });

      return {
        ...state,
        cart: updatedProducts,
      };

    case CART_TOTAL_ITEM_PRICE:
      let { total_item: totalItems, total_price: totalPrice } =
        state.cart.reduce(
          (acc, curElem) => {
            let { price, quantity } = curElem;
            acc.total_item += quantity;
            acc.total_price += price * quantity;

            return acc;
          },
          {
            total_item: 0,
            total_price: 0,
          }
        );

      return {
        ...state,
        total_item: totalItems,
        total_price: totalPrice,
      };

    default:
      return state;
  }
};

export default CartReducer;
