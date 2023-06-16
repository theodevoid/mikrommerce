import { z } from "zod";

import { PageableResponse, Province, axiosWN } from "../lib/wilayah-nusantara";
import { protectedProcedure } from "../trpc";

export const getProvinces = protectedProcedure
  .input(
    z.object({
      provinceName: z.string().optional(),
      provinceCode: z.string().optional(),
    }),
  )
  .query(async ({ input }) => {
    const { provinceName } = input;

    const { data } = await axiosWN.get<PageableResponse<Province>>(
      "/provinsi",
      {
        params: {
          name: provinceName,
        },
      },
    );

    return data;
  });
