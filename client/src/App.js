import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
    </ChakraProvider>
  );
}

export default App;
