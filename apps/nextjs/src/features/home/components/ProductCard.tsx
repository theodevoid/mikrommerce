import NextLink from "next/link";
import { Box, HStack, Icon, Image, Link, Text } from "@chakra-ui/react";
import { IoMdStar } from "react-icons/io";

interface ProductCardProps {
  onClick?: () => void;
  productName: string;
  price: number;
  rating?: number;
  image: string;
  slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  onClick,
  price,
  productName,
  rating,
  slug,
}) => {
  return (
    <Link
      as={NextLink}
      href={`/product/${slug}`}
      _hover={{ fontStyle: "none" }}
    >
      <Box
        onClick={onClick}
        _hover={{ cursor: "pointer" }}
        bg="gray.900"
        borderRadius="8px"
        overflow="hidden"
      >
        <Image h="60" w="100%" objectFit="cover" alt="product" src={image} />
        <Box p="3">
          <Text>{productName}</Text>
          <Text fontSize="lg" fontWeight="medium">
            Rp {price.toLocaleString("id-ID")}
          </Text>
          {rating && (
            <HStack spacing={1} mt="2">
              <Icon as={IoMdStar} color="gold" />
              <Text>{rating}</Text>
            </HStack>
          )}
        </Box>
      </Box>
    </Link>
  );
};
