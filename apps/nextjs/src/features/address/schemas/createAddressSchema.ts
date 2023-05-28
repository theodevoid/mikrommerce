import { z } from "zod";

export const createAddressFormSchema = z.object({
  cityId: z.string().nonempty(),
  cityName: z.string(),
  detail: z.string().min(1).max(250),
  googleMapsUrl: z.string().url().nonempty(),
  label: z.string().nonempty(),
  phoneNumber: z.string().min(1).max(12),
  recipientName: z.string().min(4).max(20),
});

export type AddressForm = z.infer<typeof createAddressFormSchema>;
