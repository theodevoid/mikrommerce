import { Button, Flex, Stack, Text } from "@chakra-ui/react";

import { toRupiah } from "~/utils/format";

interface BottomSectionProps {
  totalPrice: number;
}

export const BottomSection: React.FC<BottomSectionProps> = ({
  totalPrice = 0,
}) => {
  return (
    <Flex
      position="absolute"
      left={0}
      bottom={0}
      h="24"
      bg="gray.600"
      w="100%"
      p="4"
    >
      <Stack flex={1}>
        <Text fontSize="sm">Total Harga</Text>
        <Text fontWeight="bold">{toRupiah(totalPrice)}</Text>
      </Stack>
      <Button size="lg" h="100%" w="3xs" colorScheme="cyan">
        Checkout
      </Button>
    </Flex>
  );
};
