import { PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const createAddressFormSchema = z.object({
  detail: z.string().min(1).max(250),
  googleMapsUrl: z.string().url().nonempty(),
  label: z.string().nonempty(),
  phoneNumber: z.string().min(1).max(12),
  recipientName: z.string().min(4).max(20),
  id: z.string().optional(),
});

export type AddressForm = z.infer<typeof createAddressFormSchema>;

const resolver = zodResolver(createAddressFormSchema);

export const CreateAddressFormContext: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const methods = useForm<AddressForm>({
    resolver,
    defaultValues: {
      detail: "",
      googleMapsUrl: "",
      label: "",
      phoneNumber: "",
      recipientName: "",
      id: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
