import { Box, Text, Grid, Button, Flex, Image, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getInstruments, createOrder } from "../services/firebase"; // Import createOrder

export interface Instrument {
  id: string;
  name: string;
  description: string;
  price: number;
  urlImage: string;
  stock: number;
}

export const Home = () => {
  const [products, setProducts] = useState<Instrument[]>([]);
  const [cart, setCart] = useState<{ item: Instrument; quantity: number }[]>(
    []
  );

  // Cargar los productos desde Firebases
  useEffect(() => {
    const fetchProducts = async () => {
      const instruments = await getInstruments();
      setProducts(instruments as any);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Instrument) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.item.id === product.id
    );
    if (existingItem) {
      return;
    } else {
      setCart([...cart, { item: product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (index: number) => {
    const productInCart = cart[index].item;
    if (cart[index].quantity < productInCart.stock) {
      setCart(
        cart.map((cartItem, i) =>
          i === index
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
  };

  const decrementQuantity = (index: number) => {
    if (cart[index].quantity > 1) {
      setCart(
        cart.map((cartItem, i) =>
          i === index
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const totalPrice = cart.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0
  );

  const finalizePurchase = async () => {
    for (const cartItem of cart) {
      await createOrder({
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity,
      });
    }

    setCart([]);
    alert("Compra finalizada con éxito!");
  };

  return (
    <Flex>
      {/* Sección de productos */}
      <Box w="70%" p={4}>
        <Box textAlign="center" p={4}>
          <Text fontSize="3xl" mb={2} fontWeight="bold">
            Bienvenido a la plataforma de instrumentos musicales
          </Text>
          <Text fontSize="xl">Nuestros Productos</Text>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {products.map((product) => (
            <Box
              key={product.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              _hover={{ boxShadow: "xl" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src={product.urlImage}
                alt={product.name}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize="xl" fontWeight="bold">
                {product.name}
              </Text>
              <Text>{product.description}</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                ${product.price}
              </Text>
              <Button
                mt={2}
                colorScheme="teal"
                onClick={() => addToCart(product)}
              >
                Comprar
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Sección del carrito */}
      <Box w="30%" p={4} borderLeftWidth="1px">
        <Text fontSize="2xl" mb={4}>
          Carrito de Compras
        </Text>
        {cart.length === 0 ? (
          <Text>No hay productos en el carrito</Text>
        ) : (
          <Box>
            {cart.map((cartItem, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md" mb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>{cartItem.item.name}</Text>
                  <Flex alignItems="center">
                    <Button size="sm" onClick={() => decrementQuantity(index)}>
                      -
                    </Button>
                    <Input
                      type="number"
                      value={cartItem.quantity}
                      readOnly
                      width="60px"
                      textAlign="center"
                    />
                    <Button size="sm" onClick={() => incrementQuantity(index)}>
                      +
                    </Button>
                  </Flex>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  ${cartItem.item.price}
                </Text>

                {cartItem.quantity === cartItem.item.stock && (
                  <Text color="red.500">No hay más productos disponibles</Text>
                )}
              </Box>
            ))}

            {cart.some(
              (cartItem) => cartItem.quantity > cartItem.item.stock
            ) && (
              <Text color="red.500">
                Algunos productos exceden el stock disponible.
              </Text>
            )}
            <Text fontWeight="bold">Total: ${totalPrice.toFixed(2)}</Text>
            <Button colorScheme="teal" mt={4} onClick={finalizePurchase}>
              Finalizar compra
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
