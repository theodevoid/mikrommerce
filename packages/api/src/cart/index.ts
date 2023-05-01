import { createTRPCRouter } from "../trpc";
import { addToCart } from "./addToCart";
import { deleteCart } from "./deleteCart";
import { getCart } from "./getCart";
import { updateCart } from "./updateCart";

export const cartRouter = createTRPCRouter({
  getCart,
  addToCart,
  updateCart,
  deleteCart,
});
