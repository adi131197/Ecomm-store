import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/ProductReducer";
import {
  PRODUCTS_API_ERROR,
  SET_LOADING,
  SET_PRODUCTS_DATA,
  SET_SINGLE_LOADING,
  SET_SINGLE_PRODUCT,
  SINGLE_PRODUCT_API_ERROR,
} from "../constants/constants";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
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

  // my 2nd api call for single product

  const getSingleProduct = async (url) => {
    dispatch({ type: SET_SINGLE_LOADING });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: SET_SINGLE_PRODUCT, payload: singleProduct });
    } catch (error) {
      dispatch({ type: SINGLE_PRODUCT_API_ERROR });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
