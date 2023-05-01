import NextLink from "next/link";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IoMdMenu } from "react-icons/io";

import { api } from "~/utils/api";
import CartButton from "./CartButton";

const Navbar = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const { data: cart } = api.cart.getCart.useQuery(undefined, {
    staleTime: 1000 * 60,
  });

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const onNavigateToCart = () => {
    console.log("to cart");
  };

  return (
    <Box h="16" w="100%" backgroundColor="blackAlpha.500" px="4">
      <HStack justifyContent="space-between" alignItems="center" h="100%">
        <Link _hover={{ fontStyle: "none" }} as={NextLink} href="/">
          <Text fontWeight="medium">Mikrommerce</Text>
        </Link>
        {user ? (
          <HStack>
            <CartButton
              onClick={onNavigateToCart}
              itemCount={cart?.length || 0}
            />
            <Box>
              <Menu strategy="fixed">
                <MenuButton as={IconButton} icon={<Icon as={IoMdMenu} />} />
                <MenuList>
                  <MenuItem onClick={logout} color="red.200">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        ) : (
          <Button onClick={login}>Login</Button>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
