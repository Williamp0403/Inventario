import { createContext, useContext } from "react"
import { useProducts as useProductsProvider } from "../hooks/useProducts"; // Importa el hook personalizado

export const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe utilizarse dentro de ProductProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const products = useProductsProvider(); // Usa el hook personalizado

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  )
}