import { createContext, useContext } from "react"
import { useCategories as useCategoriesProvider } from "../hooks/useCategories"; // Importa el hook personalizado

export const CategoriesContext = createContext()

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories debe utilizarse dentro de CategoriesProvider");
  }
  return context;
};

export const CategoriesProvider = ({ children }) => {
  const categories = useCategoriesProvider(); // Usa el hook personalizado

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  )
}