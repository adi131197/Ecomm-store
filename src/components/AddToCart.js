import React, { useState } from "react";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/CartContext";

const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;
  const { addToCart } = useCartContext();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const CartQuantityToggle = () => {
    return (
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={() => decrementQuantity()}>
            <FaMinus />
          </button>
          <div className="amount-style">{quantity}</div>
          <button onClick={() => incrementQuantity()}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  };

  const decrementQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const incrementQuantity = () => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Colors:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={
                  selectedColor === curColor ? "btnStyle active" : "btnStyle"
                }
                onClick={() => setSelectedColor(curColor)}
              >
                {selectedColor === curColor ? (
                  <FaCheck className="checkStyle" />
                ) : null}
              </button>
            );
          })}
        </p>
        {CartQuantityToggle()}

        <NavLink
          to="/cart"
          onClick={() => addToCart(id, selectedColor, quantity, product)}
        >
          <Button className="btn">Add to cart</Button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart;
