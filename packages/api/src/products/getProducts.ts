import { z } from "zod";

import { Prisma } from "@mikrommerce/db";

import { publicProcedure } from "../trpc";

export const getProducts = publicProcedure
  .input(
    z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).default(10),
      name: z.string().nullable().default(""),
      categories: z.array(z.string()).nullable().default([]),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { categories, limit, name, page } = input;

    const whereClause: Prisma.ProductWhereInput = {};
    const offset = (page - 1) * limit;

    if (categories?.length) {
      whereClause.CategoriesOnProducts = {
        some: {
          categoryId: {
            in: categories,
          },
        },
      };
    }

    if (name) {
      whereClause.name = {
        contains: name,
      };
    }

    const findProducts = await prisma.product.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      include: {
        CategoriesOnProducts: {
          include: {
            category: true,
          },
        },
        ProductVariant: true,
      },
    });

    const productCount = await prisma.product.count({
      where: whereClause,
    });

    return {
      results: findProducts,
      meta: {
        page,
        total: productCount,
        perPage: limit,
        hasNext: productCount - page * limit > 0,
      },
    };
  });
