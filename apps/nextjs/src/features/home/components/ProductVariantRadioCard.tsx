import React from "react";
import { Box, RadioProps, Stack, Text, useRadio } from "@chakra-ui/react";

import { toRupiah } from "~/utils/format";

interface ProductVariantRadioCardProps {
  price: number;
  variantLabel: string;
}

export const ProductVariantRadioCard: React.FC<
  ProductVariantRadioCardProps & RadioProps
> = ({ price, variantLabel, ...props }) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        <Stack spacing="1">
          <Text fontWeight="medium">{variantLabel}</Text>
          <Text fontWeight="medium">{toRupiah(price)}</Text>
        </Stack>
      </Box>
    </Box>
  );
};
