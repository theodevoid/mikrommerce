import { z } from "zod";

import { Prisma } from "@mikrommerce/db";

import { protectedProcedure } from "../trpc";

export const getProvinces = protectedProcedure
  .input(
    z.object({
      provinceName: z.string().optional(),
      provinceId: z.string().optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { provinceName, provinceId } = input;

    const whereClause: Prisma.ProvinceWhereInput = {};

    if (provinceId) {
      whereClause.id = provinceId;
    }

    if (provinceName) {
      whereClause.province = {
        contains: provinceName,
        mode: "insensitive",
      };
    }

    const cities = await prisma.province.findMany({
      where: whereClause,
    });

    return cities;
  });
