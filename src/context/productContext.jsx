import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  console.log(user);
  return (
    <ProductContext.Provider value={{ user, setUser }}>
      {children}
    </ProductContext.Provider>
  );
};
const useProductContext = () => {
  return useContext(ProductContext);
};
export { UserProvider, useProductContext };
