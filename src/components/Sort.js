import React, { useState } from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/FilterContext";

const Sort = () => {
  const { filter_products, isGridView, ToggleView, sortByFunc } =
    useFilterContext();

  let [sortBy, setSortBy] = useState("lowest");

  const handleChange = (event) => {
    let newSortBy = event.target.value;
    setSortBy(newSortBy);
    sortByFunc(newSortBy);
  };

  return (
    <Wrapper className="sort-section">
      <div className="sorting-list--grid">
        <button
          className={isGridView ? "sort-btn active" : "sort-btn"}
          onClick={() => ToggleView(true)}
        >
          <BsFillGridFill className="icon" />
        </button>
        <button
          className={!isGridView ? "sort-btn active" : "sort-btn"}
          onClick={() => ToggleView(false)}
        >
          <BsList className="icon" />
        </button>
      </div>
      <div className="product-data">
        <p>{filter_products.length} Products Available</p>
      </div>

      {/* Sort options */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            value={sortBy}
            onChange={handleChange}
          >
            <option value="lowest">Price(lowest)</option>
            <option value="highest">Price(highest)</option>
            <option value="asc">Products(a-z)</option>
            <option value="desc">Products(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  .sorting-list--grid {
    display: flex;
    gap: 2rem;
    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }
  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;
