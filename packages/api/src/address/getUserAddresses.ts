import { protectedProcedure } from "../trpc";

export const getUserAddresses = protectedProcedure.query(async ({ ctx }) => {
  const { prisma, session } = ctx;

  const addresses = await prisma.address.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return addresses;
});
