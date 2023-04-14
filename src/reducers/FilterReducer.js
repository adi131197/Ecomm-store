import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_FILTER_PRODUCTS,
  SET_SORT_BY,
  SORT_PRODUCTS,
  TOGGLE_VIEW,
  UPDATE_FILTERS_VALUE,
} from "../constants/constants";

const filterReducer = (state, action) => {
  switch (action.type) {
    case LOAD_FILTER_PRODUCTS:
      let priceArr = action.payload.map((curElem) => curElem.price);
      let maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice,
          price: maxPrice,
        },
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

    case UPDATE_FILTERS_VALUE:
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case FILTER_PRODUCTS:
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if (category !== "All") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        });
      }

      if (company !== "All") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company === company;
        });
      }

      if (color !== "All") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color);
        });
      }

      if (price) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "All",
          company: "All",
          color: "All",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
