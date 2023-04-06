import {
  PRODUCTS_API_ERROR,
  SET_LOADING,
  SET_PRODUCTS_DATA,
} from "../constants/constants";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_PRODUCTS_DATA:
      const featuredData = action.payload.filter((product) => product.featured);

      return {
        ...state,
        isLoading: false,
        featureProducts: featuredData,
        products: action.payload,
      };
    case PRODUCTS_API_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
