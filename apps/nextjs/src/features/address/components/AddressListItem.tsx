import NextLink from "next/link";
import {
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
import { useFormContext } from "react-hook-form";

import { api } from "~/utils/api";
import { AddressForm } from "../forms/create-address";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { EditAddressModal } from "./EditAddressModal";

interface AddressListItemProps {
  label: string;
  phone: string;
  detail: string;
  mapsUrl: string;
  id: string;
  recipientName: string;
}

export const AddressListItem: React.FC<AddressListItemProps> = ({
  detail,
  id,
  label,
  mapsUrl,
  phone,
  recipientName,
}) => {
  const {
    isOpen: deleteDialogIsOpen,
    onOpen: onOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
  } = useDisclosure();
  const {
    isOpen: editModalIsOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const toast = useToast();

  const apiContext = api.useContext();

  const { mutateAsync: deleteAddress } =
    api.address.deleteAddress.useMutation();
  const { mutateAsync: upsertAddress, isLoading: upsertAddressIsLoading } =
    api.address.upsertAddress.useMutation();

  const { setValue } = useFormContext<AddressForm>();

  const handleDeleteSubmit = async () => {
    try {
      await deleteAddress({ addressId: id });
      await apiContext.address.getUserAddresses.invalidate();
      onCloseDeleteDialog();
    } catch (error) {
      toast({
        colorScheme: "red",
        title: "Terjadi kesalahan",
        description: (error as TRPCError).message,
      });
    }
  };

  const handleEditSubmit = async (values: AddressForm) => {
    console.log(
      "🚀 ~ file: AddressListItem.tsx:75 ~ handleEditSubmit ~ values:",
      values,
    );
    try {
      await upsertAddress(values);
      await apiContext.address.getUserAddresses.invalidate();
      onCloseEditModal();
      toast({
        title: "Berhasil",
        description: "Alamatmu berhasil tersimpan",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: (error as TRPCError).message,
      });
    }
  };

  const openEditModal = () => {
    onOpenEditModal();
    setValue("detail", detail);
    setValue("googleMapsUrl", mapsUrl);
    setValue("id", id);
    setValue("label", label);
    setValue("phoneNumber", phone);
    setValue("recipientName", recipientName);
  };

  return (
    <>
      <DeleteConfirmationDialog
        handleDeleteSubmit={handleDeleteSubmit}
        isOpen={deleteDialogIsOpen}
        onClose={onCloseDeleteDialog}
      />
      <EditAddressModal
        isOpen={editModalIsOpen}
        onClose={onCloseEditModal}
        isLoading={upsertAddressIsLoading}
        handleSubmit={handleEditSubmit}
      />
      <Card mt="4">
        <CardBody>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {label}
          </Text>
          <Text>{recipientName}</Text>
          <Text>{phone}</Text>
          <Text mb="2">{detail}</Text>
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
            <Button onClick={openEditModal} variant="link" size="xs">
              Ubah alamat
            </Button>
            <Box boxSize={1.5} bgColor="slategray" borderRadius="50%" />
            <Button onClick={onOpenDeleteDialog} variant="link" size="xs">
              Hapus
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};
