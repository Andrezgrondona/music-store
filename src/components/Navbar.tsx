import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box as="nav" p="4" bg="gray.800" color="white" width="100%">
      <Text 
        as={Link} 
        to="/" 
        color="red.600" 
        fontWeight="normal" 
        _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} 
        mr={4} 
      >
        Home
      </Text>
      <Text 
        as={Link} 
        to="/instrumentos" 
        color="red.600" 
        fontWeight="normal" 
        _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} 
        mr={4}
      >
        Instrumentos
      </Text>
      <Text 
        as={Link} 
        to="/crear-instrumento" 
        color="red.600" 
        fontWeight="normal" 
        _hover={{ fontWeight: 'bold', textDecoration: 'underline' }} 
      >
        Crear Instrumento
      </Text>
    </Box>
  );
};