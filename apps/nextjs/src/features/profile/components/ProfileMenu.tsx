import { Box, Icon, SimpleGrid } from "@chakra-ui/react";
import { IconMapPin } from "@tabler/icons-react";

import { ProfileMenuItem } from "./ProfileMenuItem";

export const ProfileMenu: React.FC = () => {
  return (
    <Box borderWidth={1} borderColor="gray" borderRadius="md" p="8">
      <SimpleGrid columns={4} spacing={4}>
        <ProfileMenuItem
          href="/profile/address"
          icon={<Icon as={IconMapPin} boxSize={10} />}
          label="Alamat"
        />
      </SimpleGrid>
    </Box>
  );
};
