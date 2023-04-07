import {
  PRODUCTS_API_ERROR,
  SET_LOADING,
  SET_PRODUCTS_DATA,
  SET_SINGLE_LOADING,
  SET_SINGLE_PRODUCT,
  SINGLE_PRODUCT_API_ERROR,
} from "../constants/constants";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_PRODUCTS_DATA:
      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };

    case PRODUCTS_API_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case SET_SINGLE_LOADING:
      return {
        ...state,
        isSingleLoading: true,
      };

    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case SINGLE_PRODUCT_API_ERROR:
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
