import { Flex } from "@chakra-ui/react";

export const FullPageFlex: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Flex flexDirection="column" h="calc(100vh - 64px)">
      {children}
    </Flex>
  );
};
