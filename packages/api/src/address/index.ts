import { createTRPCRouter } from "../trpc";
import { createAddress } from "./createAddress";
import { deleteAddress } from "./deleteAddress";
import { getCities } from "./getCities";
import { getProvinces } from "./getProvinces";
import { getUserAddresses } from "./getUserAddresses";

export const addressRouter = createTRPCRouter({
  getCities,
  getProvinces,
  createAddress,
  getUserAddresses,
  deleteAddress,
});
