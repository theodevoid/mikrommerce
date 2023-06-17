import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import {
  AspectRatio,
  Box,
  ButtonGroup,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Link,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";

import { api } from "~/utils/api";
import { toRupiah } from "~/utils/format";
import { serializeAddToCartError } from "../utils/serializeAddToCartError";

interface CardItemProps {
  productImage: string;
  productName: string;
  productVariantName: string;
  productVariantId: string;
  price: number;
  selected: boolean;
  quantity: number;
  id: string;
  slug: string;
  stock: number;
}

export const CartItem: React.FC<CardItemProps> = ({
  price,
  productImage,
  productName,
  productVariantName,
  productVariantId,
  quantity,
  selected = false,
  slug,
  id,
  stock,
}) => {
  const firstRenderRef = useRef<boolean>(true);

  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);
  const [quantityInputError, setQuantityInputError] = useState<string>("");
  const [debouncedQuantity] = useDebounce(currentQuantity, 1000);

  const toast = useToast();
  const apiContext = api.useContext();

  const { data: cartItem, mutate: updateCart } =
    api.cart.updateCart.useMutation({
      onError: (error) => {
        toast({
          status: "error",
          title: "Gagal menambahkan ke keranjang",
          description: serializeAddToCartError(error.message),
        });
      },
      onSuccess: async () => {
        await apiContext.cart.getCart.invalidate();
      },
    });
  const { mutate: deleteCart } = api.cart.deleteCart.useMutation({
    onError: (error) => {
      toast({
        status: "error",
        title: "Gagal menambahkan ke keranjang",
        description: serializeAddToCartError(error.message),
      });
    },
    onSuccess: async () => {
      toast({
        status: "success",
        title: "Berhasil menghapus barang dari keranjang",
      });
      await apiContext.cart.getCart.invalidate();
    },
  });

  const onUpdateCartQuantity = (type: "INCREMENT" | "DECREMENT") => {
    if (currentQuantity < stock && currentQuantity >= 0) {
      setCurrentQuantity((currentQuantity) =>
        type === "INCREMENT" ? currentQuantity + 1 : currentQuantity - 1,
      );
    }
  };

  // Call mutation when `debouncedQuantity` changes
  // Skip on first render
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else if (debouncedQuantity) {
      updateCart({
        cartId: id,
        productVariantId,
        quantity: debouncedQuantity,
      });
      setQuantityInputError("");
    }
  }, [debouncedQuantity, id, updateCart, productVariantId]);

  // Set `currentQuantity` state to response of mutation
  useEffect(() => {
    if (cartItem?.quantity) {
      setCurrentQuantity(cartItem?.quantity);
    }
  }, [cartItem?.quantity]);

  return (
    <Box>
      <Checkbox
        checked={selected}
        size="lg"
        alignSelf="center"
        spacing="1.5rem"
      >
        <HStack fontSize="initial" alignItems="stretch" w="100%">
          <AspectRatio boxSize={"24"} ratio={1 / 1} flexShrink={0}>
            <Image
              src={productImage}
              alt={productVariantName}
              draggable="false"
              borderRadius={{ base: "md", md: "xl" }}
              fallback={<Skeleton />}
            />
          </AspectRatio>
          <Box py="1">
            <Text noOfLines={1}>{productName}</Text>
            <Text color="GrayText">{productVariantName}</Text>
            <Text mt="2" fontWeight="semibold">
              {toRupiah(price)}
            </Text>
          </Box>
        </HStack>
      </Checkbox>
      <HStack mt="4" justifyContent="end">
        <Link
          fontSize="xs"
          color="gray"
          as={NextLink}
          href={`/product/${slug}`}
        >
          Lihat detail barang
        </Link>
        <HStack alignItems="center">
          <IconButton
            aria-label="Delete item"
            icon={<Icon as={IoTrashOutline} />}
            onClick={() => deleteCart({ cartId: id })}
            variant="ghost"
          />

          <ButtonGroup isAttached>
            <IconButton
              isDisabled={currentQuantity <= 1}
              aria-label="subtract quantity"
              icon={<Icon as={HiMinus} />}
              borderRightRadius={0}
              onClick={() => onUpdateCartQuantity("DECREMENT")}
            />
            <Input
              min={1}
              type="number"
              textAlign="center"
              maxW="50px"
              borderX="0px"
              borderRadius={0}
              value={currentQuantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);

                if (value <= stock) {
                  setCurrentQuantity(value);
                  return;
                }

                if (value <= 0 || isNaN(value)) {
                  setCurrentQuantity(0);
                  setQuantityInputError("Jumlah harus diisi");
                }
              }}
            />
            <IconButton
              aria-label="add quantity"
              icon={<Icon as={HiPlus} />}
              borderLeftRadius={0}
              onClick={() => onUpdateCartQuantity("INCREMENT")}
            />
          </ButtonGroup>
        </HStack>
      </HStack>
      {quantityInputError && (
        <Text mt="1" textAlign="right" fontSize="sm" color="red.200">
          {quantityInputError}
        </Text>
      )}
    </Box>
  );
};
