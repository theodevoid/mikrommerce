import { createTRPCRouter } from "../trpc";
import { deleteAddress } from "./deleteAddress";
import { getProvinces } from "./getProvinces";
import { getRegencies } from "./getRegencies";
import { getUserAddresses } from "./getUserAddresses";
import { upsertAddress } from "./upsertAddress";

export const addressRouter = createTRPCRouter({
  getProvinces,
  getRegencies,
  upsertAddress,
  getUserAddresses,
  deleteAddress,
});
