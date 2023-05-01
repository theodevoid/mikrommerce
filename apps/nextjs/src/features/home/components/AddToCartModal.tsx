import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";

import { ProductVariant } from "@mikrommerce/db";

import { api } from "~/utils/api";
import { serializeAddToCartError } from "~/features/cart";
import { ProductVariantRadioCard } from "./ProductVariantRadioCard";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productVariants: ProductVariant[];
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  productVariants,
  productName,
}) => {
  const toast = useToast();
  const { refetch: refetchCart } = api.cart.getCart.useQuery();

  const { mutate, isLoading } = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await refetchCart();
      toast({
        status: "success",
        title: "Berhasil menambahkan ke keranjang",
        description: "Produk dimasukkan ke dalam keranjangmu",
      });
    },
    onError: (error) => {
      toast({
        status: "error",
        title: "Gagal menambahkan ke keranjang",
        description: serializeAddToCartError(error.message),
      });
    },
  });

  const {
    getRadioProps,
    getRootProps,
    value: selectedVariant,
  } = useRadioGroup({
    name: "variants",
  });

  const group = getRootProps();

  const renderVariants = () => {
    return productVariants.map((productVariant) => {
      const radio = getRadioProps({ value: productVariant.id });

      return (
        <ProductVariantRadioCard
          key={productVariant.id}
          price={productVariant.price}
          variantLabel={productVariant.label}
          {...radio}
        />
      );
    });
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pilih varian {productName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="2" {...group}>
            {renderVariants()}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="2">
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={isLoading}
              colorScheme="blue"
              onClick={() =>
                mutate({
                  productVariantId: selectedVariant as string,
                  quantity: 1,
                })
              }
            >
              Tambahkan ke keranjang
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
