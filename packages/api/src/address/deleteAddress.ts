import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const deleteAddress = protectedProcedure
  .input(
    z.object({
      addressId: z.string().nonempty(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { addressId } = input;

    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (address?.userId !== session.user.id || !address) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "something went wrong",
      });
    }

    await prisma.address.delete({
      where: {
        id: address.id,
      },
    });

    return address;
  });
