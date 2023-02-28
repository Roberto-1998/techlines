import Navbar from './components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <main></main>
    </ChakraProvider>
  );
}

export default App;
