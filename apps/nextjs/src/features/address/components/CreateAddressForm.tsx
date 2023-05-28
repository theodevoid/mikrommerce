import { useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Select as ReactSelect } from "chakra-react-select";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

import { api } from "~/utils/api";
import {
  AddressForm,
  createAddressFormSchema,
} from "../schemas/createAddressSchema";

const resolver = zodResolver(createAddressFormSchema);

interface CreateAddressFormProps {
  onSubmit: (values: AddressForm) => void;
  isLoading: boolean;
}

export const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [debouncedCitySelect, setDebouncedCitySelect] = useDebounce("", 1000);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<AddressForm>({
    resolver,
    defaultValues: {
      cityId: "",
      detail: "",
      label: "",
      phoneNumber: "",
      recipientName: "",
    },
  });

  const {
    data: cities,
    refetch: refetchCities,
    isFetching,
  } = api.address.getCities.useQuery(
    {
      cityName: debouncedCitySelect,
    },
    { enabled: false },
  );

  const handleCitySelectChange = (value: string) => {
    setValue("cityName", value);
    setDebouncedCitySelect(value);
  };

  useEffect(() => {
    if (debouncedCitySelect) {
      void refetchCities();
    }
  }, [debouncedCitySelect, refetchCities]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
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
        <FormControl isInvalid={!!errors.label}>
          <FormLabel>Label</FormLabel>
          <Input {...register("label")} />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.cityId}>
          <FormLabel>Kota/Kabupaten</FormLabel>
          <ReactSelect
            isLoading={isFetching}
            options={cities}
            getOptionLabel={(option) => option.cityName}
            getOptionValue={(option) => option.id}
            onInputChange={(value) => handleCitySelectChange(value)}
            onChange={(value) => setValue("cityId", value?.id as string)}
          />
          <FormErrorMessage>{errors.cityId?.message}</FormErrorMessage>
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
