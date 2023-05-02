import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const deleteCart = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cartId } = input;

    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });
