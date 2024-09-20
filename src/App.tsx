import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/index';
import { Instrumentos } from './pages/EditProduct';
import { CrearInstrumento } from './pages/CreateProduct';
import { Navbar } from './components/Navbar';

 const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instrumentos" element={<Instrumentos />} />
          <Route path="/crear-instrumento" element={<CrearInstrumento />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;



