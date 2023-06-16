import { NextPage } from "next";
import {
  Box,
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { TRPCError } from "@trpc/server";

import { api } from "~/utils/api";
import { AddressList, CreateAddressForm } from "~/features/address/components";
import {
  AddressForm,
  CreateAddressFormContext,
} from "~/features/address/forms/create-address";
import { ProfileLayout } from "~/features/profile/components";

const Address: NextPage = () => {
  const apiContext = api.useContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const { mutateAsync: upsertAddress, isLoading } =
    api.address.upsertAddress.useMutation();

  const handleSubmit = async (values: AddressForm) => {
    console.log("🚀 ~ file: address.tsx:36 ~ handleSubmit ~ values:", values);
    try {
      await upsertAddress(values);
      await apiContext.address.getUserAddresses.invalidate();
      onClose();
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

  return (
    <ProfileLayout>
      <Box mb="5">
        <Heading>Daftar Alamat</Heading>
      </Box>
      <Button
        onClick={onOpen}
        variant="solid"
        leftIcon={<Icon as={IconPlus} />}
      >
        Tambah Alamat
      </Button>
      <AddressList />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Alamat</ModalHeader>
          <ModalBody>
            <CreateAddressFormContext>
              <CreateAddressForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </CreateAddressFormContext>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </ProfileLayout>
  );
};

export default Address;
