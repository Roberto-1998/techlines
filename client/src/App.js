import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from './components/Footer';
import { Suspense, lazy } from 'react';
import CustomSpinner from './components/CustomSpinner';
import ProtectedRoute from './components/ProtectedRoute';

const LazyHomePage = lazy(() => import('./pages/HomePage'));
const LazyProductsPage = lazy(() => import('./pages/ProductsPage'));
const LazyProductPage = lazy(() => import('./pages/ProductPage'));
const LazyCartPage = lazy(() => import('./pages/CartPage'));
const LazyLoginPage = lazy(() => import('./pages/LoginPage'));
const LazyRegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const LazyProfilePage = lazy(() => import('./pages/ProfilePage'));
const LazyCheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LazyYourOrdersPage = lazy(() => import('./pages/YourOrdersPage'));
const LazyAdminConsolePage = lazy(() => import('./pages/AdminConsolePage'));
const LazyOrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));

function App() {
  return (
    <ChakraProvider>
      <Suspense fallback={<CustomSpinner />}>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LazyHomePage />} />
            <Route path='/products' element={<LazyProductsPage />} />
            <Route path='/product/:id' element={<LazyProductPage />} />
            <Route path='/cart' element={<LazyCartPage />} />
            <Route path='/login' element={<LazyLoginPage />} />
            <Route path='/registration' element={<LazyRegistrationPage />} />
            <Route path='/order-success' element={<LazyOrderSuccessPage />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <LazyProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/checkout'
              element={
                <ProtectedRoute>
                  <LazyCheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/your-orders'
              element={
                <ProtectedRoute>
                  {' '}
                  <LazyYourOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/admin-console'
              element={
                <ProtectedRoute>
                  <LazyAdminConsolePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
