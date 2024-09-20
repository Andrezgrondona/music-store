import { useState } from 'react';
import { Button, Input, Textarea, FormControl, FormLabel, Box } from '@chakra-ui/react';
import { createInstrument } from '../services/firebase';

export const InstrumentForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [price, setPrice] = useState(''); 
  const [stock, setStock] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createInstrument({ name, description, urlImage, price: Number(price), stock: Number(stock) }); 
    setDescription('');
    setUrlImage('');
    setPrice(''); 
    setStock(''); 
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Descripción</FormLabel>
          <Textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Imagen</FormLabel>
          <Input placeholder="URL de la Imagen" value={urlImage} onChange={(e) => setUrlImage(e.target.value)} />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Precio</FormLabel>
          <Input 
            placeholder="Precio" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Stock</FormLabel>
          <Input 
            placeholder="Cantidad" 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
          />
        </FormControl>

        <Button type="submit" colorScheme="teal">Crear Instrumento</Button>
      </form>
    </Box>
  );
};