import { cartRouter } from "./cart";
import { productRouter } from "./products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
