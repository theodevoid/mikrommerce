import { Box, Icon, IconButton, Text } from "@chakra-ui/react";
import { IoMdCart } from "react-icons/io";

interface CartButtonProps {
  onClick: () => void;
  itemCount?: number;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, itemCount }) => {
  return (
    <Box position="relative">
      <IconButton
        onClick={onClick}
        aria-label="cart"
        icon={<Icon as={IoMdCart} />}
      />
      {itemCount && (
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
  );
};

export default CartButton;
