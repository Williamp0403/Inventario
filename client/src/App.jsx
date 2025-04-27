import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { History } from './pages/History'
import { SnackbarProvider } from 'notistack';
import { ProductsProvider } from './context/ProductContext';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { CategoriesProvider } from './context/CategoryContext';
import { CategoryPage } from './pages/CategoryPage';

function App() {
  
  return (
    <ThemeProviderWrapper>
      <SnackbarProvider>

        <CategoriesProvider>
          <ProductsProvider>

              <BrowserRouter>
                <Header/>
                  <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/history' element={<History/>}/>
                    <Route path='/category' element={<CategoryPage/>}/>
                  </Routes>
              </BrowserRouter>

          </ProductsProvider>
        </CategoriesProvider>
        
      </SnackbarProvider>
    </ThemeProviderWrapper>
  )
}

export default App
