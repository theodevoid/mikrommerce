import { createTRPCRouter } from "../trpc";
import { getProducts } from "./getProducts";

export const productRouter = createTRPCRouter({
  getProducts,
});
