import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

import { AddressForm } from "../forms/create-address";
import { CreateAddressForm } from "./CreateAddressForm";

interface EditAddressModalProps extends Omit<ModalProps, "children"> {
  handleSubmit: (values: AddressForm) => void;
  isLoading: boolean;
}

export const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Alamat</ModalHeader>
        <ModalBody>
          <CreateAddressForm onSubmit={handleSubmit} isLoading={isLoading} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
