import { useRef } from "react";
import NextLink from "next/link";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TRPCError } from "@trpc/server";

import { api } from "~/utils/api";

interface AddressListItemProps {
  label: string;
  phone: string;
  detail: string;
  city: string;
  province: string;
  postalCode: string;
  mapsUrl: string;
  id: string;
}

export const AddressListItem: React.FC<AddressListItemProps> = ({
  detail,
  id,
  label,
  mapsUrl,
  phone,
  city,
  postalCode,
  province,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();
  const apiContext = api.useContext();

  const { mutateAsync: deleteAddress } =
    api.address.deleteAddress.useMutation();

  const handleDeleteSubmit = async () => {
    try {
      await deleteAddress({ addressId: id });
      await apiContext.address.getUserAddresses.invalidate();
      onClose();
    } catch (error) {
      toast({
        colorScheme: "red",
        title: "Terjadi kesalahan",
        description: (error as TRPCError).message,
      });
    }
  };

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Alamat?
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin? Data ini tidak bisa dikembalikan setelah kamu
              hapus.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme="red" onClick={handleDeleteSubmit} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Card mt="4">
        <CardBody>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {label}
          </Text>
          <Text>{phone}</Text>
          <Text mb="2">
            {detail}, {city}, {province}, {postalCode}
          </Text>
          <Link
            fontSize="sm"
            fontWeight="bold"
            href={mapsUrl}
            target="_blank"
            as={NextLink}
          >
            View in Google Maps
          </Link>

          <HStack mt="4" justifyContent="end" alignItems="center">
            <Button variant="link" size="xs">
              Ubah alamat
            </Button>
            <Box boxSize={1.5} bgColor="slategray" borderRadius="50%" />
            <Button onClick={onOpen} variant="link" size="xs">
              Hapus
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};
