import { Avatar, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";

export const ProfileLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const user = useUser();

  return (
    <Container>
      <Flex alignItems="center" my="8">
        <Avatar size="xl" src={user?.user_metadata?.avatar_url as string} />
        <Stack ml="4" spacing={0}>
          <Text fontSize="2xl" fontWeight="bold">
            {user?.user_metadata?.full_name}
          </Text>
          <Text color="whiteAlpha.700">{user?.email}</Text>
        </Stack>
      </Flex>
      {children}
    </Container>
  );
};
