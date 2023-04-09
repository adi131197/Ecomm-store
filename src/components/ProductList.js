import React from "react";
import { useFilterContext } from "../context/FilterContext";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, isGridView } = useFilterContext();

  if (isGridView) {
    return <GridView products={filter_products} />;
  } else {
    return <ListView products={filter_products} />;
  }
};

export default ProductList;
