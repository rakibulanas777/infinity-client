import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [productDetails, getProductDetails] = useState(null);

  return (
    <ProductContext.Provider
      value={{ product, setProduct, productDetails, getProductDetails }}
    >
      {children}
    </ProductContext.Provider>
  );
};
const useProductContext = () => {
  return useContext(ProductContext);
};
export { ProductProvider, useProductContext };
