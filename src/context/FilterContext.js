import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_FILTER_PRODUCTS,
  SET_SORT_BY,
  SORT_PRODUCTS,
  TOGGLE_VIEW,
  UPDATE_FILTERS_VALUE,
} from "../constants/constants";
import reducer from "../reducers/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  isGridView: false,
  sortBy: "lowest",
  filters: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const ToggleView = (view) => {
    return dispatch({ type: TOGGLE_VIEW, payload: view });
  };

  const sortByFunc = (value) => {
    return dispatch({ type: SET_SORT_BY, payload: value });
  };

  const updateFilterValue = (event) => {
    let { name, value } = event.target;

    return dispatch({ type: UPDATE_FILTERS_VALUE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sortBy, state.filters]);

  useEffect(() => {
    dispatch({ type: LOAD_FILTER_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        ToggleView,
        sortByFunc,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
