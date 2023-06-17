import { addressRouter } from "./address";
import { cartRouter } from "./cart";
import { orderRouter } from "./order";
import { productRouter } from "./products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
  address: addressRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
