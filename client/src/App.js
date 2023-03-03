import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
