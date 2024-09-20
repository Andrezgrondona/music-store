
import React, { useState } from 'react';
import { Button, Card, Image, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, useDisclosure } from '@chakra-ui/react';

interface InstrumentCardProps {
  id: string;
  name: string;
  description: string;
  urlImage: string;
  price: number;
  stock: number;
  onEdit: (id: string, updatedInstrument: any) => void; 
  onDelete: () => void; 
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  id,
  name,
  description,
  urlImage,
  price,
  stock,
  onEdit,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedInstrument, setUpdatedInstrument] = useState({
    name,
    description,
    urlImage,
    price,
    stock,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInstrument({
      ...updatedInstrument,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onEdit(id, updatedInstrument);
    onClose();
  };

  return (
    <>
      <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md">
        <Image src={urlImage} alt={name} boxSize="100%" objectFit="cover" />

        <Stack spacing={3} p={5}>
          <Text fontWeight="bold" fontSize="xl">{name}</Text>
          <Text>{description}</Text>
          <Text color="green.500">${price}</Text>
          <Text>Stock: {stock}</Text>

          <Button colorScheme="blue" onClick={onOpen}>
            Editar
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Eliminar
          </Button>
        </Stack>
      </Card>

      {/* Modal para editar el instrumento */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Instrumento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="Nombre del instrumento"
                name="name"
                value={updatedInstrument.name}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Descripción"
                name="description"
                value={updatedInstrument.description}
                onChange={handleInputChange}
              />
              <Input
                placeholder="URL de la imagen"
                name="urlImage"
                value={updatedInstrument.urlImage}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Precio"
                name="price"
                type="number"
                value={updatedInstrument.price}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Stock"
                name="stock"
                type="number"
                value={updatedInstrument.stock}
                onChange={handleInputChange}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Guardar
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

