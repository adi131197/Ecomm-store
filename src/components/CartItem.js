import React from "react";
import FormatPrice from "../helpers/FormatPrice";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

const CartItem = ({ id, name, image, selectedColor, price, quantity }) => {
  const { removeItem, decrementQuantity, incrementQuantity } = useCartContext();

  const CartQuantityToggle = () => {
    return (
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={() => decrementQuantity(id)}>
            <FaMinus />
          </button>
          <div className="amount-style">{quantity}</div>
          <button onClick={() => incrementQuantity(id)}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>Color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: selectedColor, color: selectedColor }}
            ></div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity */}
      {CartQuantityToggle()}

      {/* Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * quantity} />
        </p>
      </div>

      {/* Remove  */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
