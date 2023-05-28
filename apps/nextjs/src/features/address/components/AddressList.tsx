import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
  Stack,
} from "@chakra-ui/react";

import { api } from "~/utils/api";
import { AddressListItem } from "./AddressListItem";

export const AddressList = () => {
  const { data, isLoading, isRefetching } =
    api.address.getUserAddresses.useQuery();

  if (data?.length) {
    return (
      <>
        {data.map((address) => {
          return (
            <AddressListItem
              city={address.city.cityName}
              detail={address.detail}
              id={address.id}
              label={address.label}
              mapsUrl={address.googleMapsUrl}
              phone={address.phoneNumber}
              postalCode={address.city.postalCode}
              province={address.city.province.province}
              key={address.id}
            />
          );
        })}
      </>
    );
  }

  if (isLoading || isRefetching)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <Box my="4">
      <Alert status="info" borderRadius="sm">
        <AlertIcon />
        <Stack spacing={1}>
          <AlertTitle>Daftar alamat kosong</AlertTitle>
          <AlertDescription>
            Alamat yang kamu daftarkan nanti akan muncul di sini
          </AlertDescription>
        </Stack>
      </Alert>
    </Box>
  );
};
