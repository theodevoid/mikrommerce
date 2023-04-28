import NextLink from "next/link";
import {
  AspectRatio,
  Button,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ProductVariant } from "@mikrommerce/db";

import { toRupiah } from "~/utils/format";
import { AddToCartModal } from "./AddToCartModal";

interface ProductCardProps {
  onClick?: () => void;
  productName: string;
  price: number;
  rating?: number;
  image: string;
  slug: string;
  productVariants: ProductVariant[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  productName,
  slug,
  productVariants,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Stack spacing={{ base: "4", md: "5" }}>
      <AddToCartModal
        isOpen={isOpen}
        onClose={onClose}
        productVariants={productVariants}
        productName={productName}
      />
      <AspectRatio ratio={4 / 3}>
        <Image
          src={image}
          alt={productName}
          draggable="false"
          borderRadius={{ base: "md", md: "xl" }}
        />
      </AspectRatio>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
          >
            {productName}
          </Text>
          <Text
            fontWeight="medium"
            color={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
          >
            {toRupiah(price)}
          </Text>
        </Stack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" width="full" onClick={onOpen}>
          Add to cart
        </Button>
        <Link
          as={NextLink}
          href={`/product/${slug}`}
          textDecoration="underline"
          textUnderlineOffset="2px"
        >
          View Details
        </Link>
      </Stack>
    </Stack>
  );
};
