import { z } from "zod";

import { PageableResponse, Regency, axiosWN } from "../lib/wilayah-nusantara";
import { protectedProcedure } from "../trpc";

export const getRegencies = protectedProcedure
  .input(
    z.object({
      regencyName: z.string().optional(),
      provinceCode: z.string().optional(),
    }),
  )
  .query(async ({ input }) => {
    const { regencyName, provinceCode } = input;

    const { data } = await axiosWN.get<PageableResponse<Regency>>(
      "/kabupaten",
      {
        params: {
          name: regencyName,
          provinsiCode: provinceCode,
        },
      },
    );

    return data;
  });
