import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path='/products' element={<ProductsPage />} />
        </Routes>
      </main>
    </ChakraProvider>
  );
}

export default App;
