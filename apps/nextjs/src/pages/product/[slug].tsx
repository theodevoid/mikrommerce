import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

import { prisma } from "@mikrommerce/db";

import { FullPageFlex } from "~/components/Layout";

interface ProductDetailProps {
  productName: string;
  price: number;
  rating?: number;
  image: string;
  slug: string;
  description: string;
  categories: string[];
  id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  categories,
  description,
  image,
  price,
  productName,
}) => {
  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <Badge key={category} bg="teal">
          {category}
        </Badge>
      );
    });
  };

  return (
    <Container p={0}>
      <FullPageFlex>
        <Box flex={1}>
          <Box bg="black">
            <Image
              alt={productName}
              objectFit="contain"
              w="100%"
              h="96"
              src={image}
            />
          </Box>
          <Container mt="2">
            <Text fontSize="xl">{productName}</Text>
            <Text fontWeight="medium" fontSize="3xl">
              Rp {price.toLocaleString("id-ID")}
            </Text>
            <Flex flexWrap="wrap" gap={3} mt="2">
              {renderCategories()}
            </Flex>
            <Text mt="2">{description}</Text>
          </Container>
        </Box>
        <Box px="4" pb="4" backgroundColor="blackAlpha.500">
          <HStack mt="5" justifyContent="space-between">
            <IconButton
              bg="gray.300"
              aria-label="Decrement quantity"
              icon={<Icon color="black" as={BsDashLg} />}
            />
            <Input
              type="number"
              textAlign="center"
              variant="flushed"
              w="50px"
            />
            <IconButton
              bg="gray.300"
              aria-label="Increment quantity"
              icon={<Icon color="black" as={BsPlusLg} />}
            />
          </HStack>
          <Button bg="green.500" w="100%" mt="4">
            Tambahkan ke keranjang
          </Button>
        </Box>
      </FullPageFlex>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ProductDetailProps>> => {
  const slug = context.params?.slug as string;

  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      CategoriesOnProducts: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!product) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const { id, image, description, name, price, rating, CategoriesOnProducts } =
    product;

  const categories = CategoriesOnProducts.map((val) => {
    return val.category.name;
  });

  return {
    props: {
      id,
      description,
      image,
      productName: name,
      price,
      rating,
      slug,
      categories,
    },
  };
};

export default ProductDetail;
