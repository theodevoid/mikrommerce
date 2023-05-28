import { z } from "zod";

import { Prisma } from "@mikrommerce/db";

import { protectedProcedure } from "../trpc";

export const getCities = protectedProcedure
  .input(
    z.object({
      cityId: z.string().optional(),
      cityName: z.string().optional(),
      provinceId: z.string().optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cityName, provinceId, cityId } = input;

    const whereClause: Prisma.CityWhereInput = {};

    if (cityId) {
      whereClause.id = cityId;
    }

    if (provinceId) {
      whereClause.provinceId = provinceId;
    }

    if (cityName) {
      whereClause.cityName = {
        contains: cityName,
        mode: "insensitive",
      };
    }

    whereClause.type = "Kota";

    const cities = await prisma.city.findMany({
      where: whereClause,
    });

    return cities;
  });
