import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/ProductReducer";
import {
  SET_PRODUCTS_DATA,
  PRODUCTS_API_ERROR,
  SET_LOADING,
} from "../constants/constants";

const AppContext = createContext();
const API_URL = "https://api.pujakaitem.com/api/products";
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: SET_PRODUCTS_DATA, payload: products });
    } catch (error) {
      dispatch({ type: PRODUCTS_API_ERROR });
    }
  };

  useEffect(() => {
    getProducts(API_URL);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// Hook
const useProductContent = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContent };
