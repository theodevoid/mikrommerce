import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { IoMdMenu } from "react-icons/io";

import { api } from "~/utils/api";
import CartButton from "./CartButton";

const Navbar = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { toggleColorMode } = useColorMode();

  const colorModeIcon = useColorModeValue(IconSunFilled, IconMoonFilled);

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

  return (
    <Box h="16" w="100%" backgroundColor="blackAlpha.500" px="4">
      <HStack justifyContent="space-between" alignItems="center" h="100%">
        <HStack>
          <Link _hover={{ fontStyle: "none" }} as={NextLink} href="/">
            <Heading size="md" fontWeight="semibold">
              Mikrommerce
            </Heading>
          </Link>
        </HStack>

        <HStack>
          <IconButton
            onClick={toggleColorMode}
            aria-label="toggle-mode"
            icon={<Icon as={colorModeIcon} />}
          />
          {user ? (
            <>
              <CartButton itemCount={cart?.length || 0} />
              <Box>
                <Menu strategy="fixed">
                  <MenuButton as={IconButton} icon={<Icon as={IoMdMenu} />} />
                  <MenuList>
                    <Link
                      _hover={{ fontStyle: "none" }}
                      as={NextLink}
                      href="/profile"
                    >
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={logout} color="red.200">
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          ) : (
            <Button onClick={login}>Login</Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;
