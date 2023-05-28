import { z } from "zod";

import { protectedProcedure } from "../trpc";
import { serializePhoneNumber } from "../utils";

export const createAddress = protectedProcedure
  .input(
    z.object({
      cityId: z.string().nonempty(),
      detail: z.string().min(1).max(250),
      googleMapsUrl: z.string().url().nonempty(),
      label: z.string().nonempty(),
      phoneNumber: z.string().max(12).transform(serializePhoneNumber),
      recipientName: z.string().min(4).max(20),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma, session } = ctx;

    const address = await prisma.address.create({
      data: {
        ...input,
        userId: session.user.id,
      },
    });

    return address;
  });
