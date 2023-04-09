import {
  LOAD_FILTER_PRODUCTS,
  SET_SORT_BY,
  SORT_PRODUCTS,
  TOGGLE_VIEW,
} from "../constants/constants";

const filterReducer = (state, action) => {
  switch (action.type) {
    case LOAD_FILTER_PRODUCTS:
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case TOGGLE_VIEW:
      return {
        ...state,
        isGridView: action.payload,
      };

    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };

    case SORT_PRODUCTS:
      let newSortData;

      const { filter_products, sortBy } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sortBy === "lowest") {
          return a.price - b.price;
        }

        if (sortBy === "highest") {
          return b.price - a.price;
        }

        if (sortBy === "asc") {
          return a.name.localeCompare(b.name);
        }

        if (sortBy === "desc") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    default:
      return state;
  }
};

export default filterReducer;
