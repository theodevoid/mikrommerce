import { protectedProcedure } from "../trpc";

export const getCart = protectedProcedure.query(async ({ ctx }) => {
  const { prisma, session } = ctx;

  const cart = await prisma.cart.findMany({
    where: {
      userId: session.user.id,
      deletedAt: null,
      checkoutAt: null,
    },
    include: {
      item: true,
    },
  });

  return cart;
});
