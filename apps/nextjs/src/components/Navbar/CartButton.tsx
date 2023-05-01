import NextLink from "next/link";
import { Box, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import { IoMdCart } from "react-icons/io";

interface CartButtonProps {
  itemCount?: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <Link _hover={{ fontStyle: "none" }} as={NextLink} href="/cart">
      <Box position="relative">
        <IconButton aria-label="cart" icon={<Icon as={IoMdCart} />} />
        {/* Contoh kenapa lebih baik pake ternary atau convert `itemCount` jadi boolean dulu */}
        {Boolean(itemCount) && (
          <Box
            top={-1}
            right={-1}
            boxSize="4"
            position="absolute"
            borderRadius="50%"
            bg="red"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize="11">
              {itemCount}
            </Text>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default CartButton;
