import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { AddressForm } from "../forms/create-address";

interface CreateAddressFormProps {
  onSubmit: (values: AddressForm) => void;
  isLoading: boolean;
}

export const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useFormContext<AddressForm>();

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
        reset();
      })}
    >
      <Stack>
        <FormControl isInvalid={!!errors.label}>
          <FormLabel>Label</FormLabel>
          <Input {...register("label")} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.recipientName}>
          <FormLabel>Nama Penerima</FormLabel>
          <Input {...register("recipientName")} />
          <FormErrorMessage>{errors.recipientName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phoneNumber}>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon>+62</InputLeftAddon>
            <Input type="number" {...register("phoneNumber")} />
          </InputGroup>
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.detail}>
          <FormLabel>Alamat lengkap</FormLabel>
          <Textarea {...register("detail")} resize="none" />
          <FormHelperText>{watch("detail").length} / 250</FormHelperText>
          <FormErrorMessage>{errors.detail?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Link Titik Google Maps</FormLabel>
          <Input {...register("googleMapsUrl")} resize="none" />
          <FormHelperText>
            <Link href="https://maps.google.com" target="_blank">
              Buka google maps
            </Link>
          </FormHelperText>
          <FormErrorMessage>{errors.googleMapsUrl?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Button
        isLoading={isLoading}
        mt="8"
        type="submit"
        width="100%"
        colorScheme="cyan"
      >
        Simpan
      </Button>
    </form>
  );
};
