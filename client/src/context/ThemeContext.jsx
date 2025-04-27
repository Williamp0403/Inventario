import { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || 'dark');


  const theme = createTheme({
    palette: {
      mode: themeMode.toLowerCase(), // "light" | "dark"
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext debe usarse dentro de ThemeProviderWrapper");
  }
  return context;
};
