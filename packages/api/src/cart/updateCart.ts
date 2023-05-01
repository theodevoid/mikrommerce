import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { InventoryStatus } from "@mikrommerce/db";

import { protectedProcedure } from "../trpc";

export const updateCart = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      productVariantId: z.string(),
      quantity: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cartId, quantity, productVariantId } = input;

    return await prisma.$transaction(async (tx) => {
      const productStock = await tx.inventory.count({
        where: {
          status: InventoryStatus.AVAILABLE,
          productVariantId,
          quantity: {
            gte: quantity,
          },
        },
      });

      if (!productStock) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "insufficient stock",
        });
      }

      const cart = await tx.cart.update({
        where: {
          id: cartId,
        },
        data: {
          quantity,
        },
      });

      return cart;
    });
  });
