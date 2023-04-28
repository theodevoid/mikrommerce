import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoSearch,
} from "react-icons/io5";
import { useDebounce } from "use-debounce";

import { api } from "~/utils/api";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [debouncedSearchProduct] = useDebounce(searchProduct, 1000);

  const {
    data: products,
    isLoading,
    isRefetching,
  } = api.product.getProducts.useQuery(
    {
      limit: 2,
      page,
      name: debouncedSearchProduct,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const router = useRouter();

  const renderProducts = () => {
    return products?.results.map(
      ({ id, image, name, price, rating, slug, ProductVariant }) => {
        return (
          <ProductCard
            slug={slug}
            key={id}
            image={image[0] || ""}
            productName={name}
            price={price}
            rating={rating}
            productVariants={ProductVariant}
          />
        );
      },
    );
  };

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchProduct(e?.currentTarget.value);
  };

  useEffect(() => {
    if (router.isReady) {
      void router.push({
        query: {
          page,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // wait until router is ready, then set `page` state to the page
  useEffect(() => {
    if (router.isReady) {
      setPage(
        parseInt(router.query.page ? (router.query.page as string) : "1"),
      );
    }
  }, [router.isReady, router.query.page]);

  return (
    <Box pb="8">
      <InputGroup>
        <Input mb="4" placeholder="Cari produk..." onChange={onSearchChange} />
        <InputRightElement pointerEvents="none">
          <Icon as={IoSearch} />
        </InputRightElement>
      </InputGroup>
      {isLoading || isRefetching ? (
        <HStack justifyContent="center">
          <Spinner />
        </HStack>
      ) : (
        <SimpleGrid columns={2} spacing={4} rowGap={4}>
          {renderProducts()}
        </SimpleGrid>
      )}
      <Grid templateColumns="repeat(3, 1fr)" mt="8">
        <GridItem display="flex" justifyContent="start" alignItems="center">
          {products?.meta.page !== 1 && (
            <IconButton
              aria-label="Previous page"
              icon={<Icon as={IoChevronBackOutline} />}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            />
          )}
        </GridItem>
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            {products?.meta.page}
          </Text>
        </GridItem>
        <GridItem display="flex" justifyContent="end" alignItems="center">
          {products?.meta.hasNext && (
            <IconButton
              aria-label="Previous page"
              icon={<Icon as={IoChevronForwardOutline} />}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            />
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
