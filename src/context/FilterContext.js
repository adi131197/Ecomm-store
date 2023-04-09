import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import {
  LOAD_FILTER_PRODUCTS,
  SET_SORT_BY,
  SORT_PRODUCTS,
  TOGGLE_VIEW,
} from "../constants/constants";
import reducer from "../reducers/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  isGridView: false,
  sortBy: "lowest",
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

  useEffect(() => {
    return dispatch({ type: SORT_PRODUCTS });
  }, [state.sortBy]);

  useEffect(() => {
    dispatch({ type: LOAD_FILTER_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, ToggleView, sortByFunc }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
