import { createTRPCRouter } from "../trpc";
import { addToCart } from "./addToCart";
import { getCart } from "./getCart";

export const cartRouter = createTRPCRouter({
  getCart,
  addToCart,
});
