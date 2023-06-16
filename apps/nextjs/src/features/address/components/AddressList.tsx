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
import { CreateAddressFormContext } from "../forms/create-address";
import { AddressListItem } from "./AddressListItem";

export const AddressList = () => {
  const { data, isLoading, isRefetching } =
    api.address.getUserAddresses.useQuery();

  if (data?.length) {
    return (
      <CreateAddressFormContext>
        {data.map((address) => {
          return (
            <AddressListItem
              detail={address.detail}
              id={address.id}
              label={address.label}
              mapsUrl={address.googleMapsUrl}
              phone={address.phoneNumber}
              key={address.id}
              recipientName={address.recipientName}
            />
          );
        })}
      </CreateAddressFormContext>
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
