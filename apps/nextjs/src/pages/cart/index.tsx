import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";

import { api } from "~/utils/api";
import { CartItem } from "~/features/cart";
import { useClientProtectedPage } from "~/hooks/useClientProtectedPage";

const Cart = () => {
  useClientProtectedPage();

  // TODO: Add loading skeletons
  const { data: cart } = api.cart.getCart.useQuery();

  const renderCart = () => {
    if (!cart?.length) {
      return (
        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>Keranjangmu kosong!</AlertTitle>
            <AlertDescription>
              Ayo tambahkan barang-barang ke keranjangmu.
            </AlertDescription>
          </Box>
        </Alert>
      );
    }

    return cart?.map((cartItem) => {
      return (
        <CartItem
          id={cartItem.id}
          price={cartItem.item.price}
          productImage={cartItem.item.image}
          productName={cartItem.item.product.name}
          productVariantName={cartItem.item.label}
          productVariantId={cartItem.item.id}
          quantity={cartItem.quantity}
          selected // TODO: implement selected
          slug={cartItem.item.product.slug}
          key={cartItem.id}
          stock={cartItem.item.Inventory[0]?.quantity as number}
        />
      );
    });
  };

  return (
    <Container>
      <Heading size="lg" mb="8">
        Keranjang belanja
      </Heading>
      <Stack spacing={8}>{renderCart()}</Stack>
    </Container>
  );
};

export default Cart;
