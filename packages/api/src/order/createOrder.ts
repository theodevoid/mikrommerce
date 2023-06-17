import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const createOrder = protectedProcedure
  .input(
    z.object({
      productVariantId: z.string(),
      quantity: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {});
