import Link from "next/link";
import { Stack, Text } from "@chakra-ui/react";

interface ProfileMenuItemProps {
  href: string;
  icon: React.ReactElement;
  label: string;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  href,
  icon,
  label,
}) => {
  return (
    <Link href={href}>
      <Stack
        align="center"
        _hover={{ cursor: "pointer", opacity: 0.8, transition: "50ms" }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          backgroundColor="darkslategray"
          boxSize={16}
          borderRadius="50%"
        >
          {icon}
        </Stack>
        <Text>{label}</Text>
      </Stack>
    </Link>
  );
};
