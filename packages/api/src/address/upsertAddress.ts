import { z } from "zod";

import { protectedProcedure } from "../trpc";
import { serializePhoneNumber } from "../utils";

export const upsertAddress = protectedProcedure
  .input(
    z.object({
      detail: z.string().min(1).max(250),
      googleMapsUrl: z.string().url().nonempty(),
      label: z.string().nonempty(),
      phoneNumber: z.string().max(12).transform(serializePhoneNumber),
      recipientName: z.string().min(4).max(20),
      id: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { id } = input;

    const addressFromId = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (addressFromId) {
      return await prisma.address.update({
        data: {
          ...input,
          id: undefined,
        },
        where: {
          id,
        },
      });
    }

    return await prisma.address.create({
      data: {
        ...input,
        userId: session.user.id,
        id: undefined,
      },
    });
  });
