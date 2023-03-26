import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const userRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count({});
  }),
  add: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userCount = await ctx.prisma.user.count({});
      if (userCount > 1) {
        console.log("userCount > 1", userCount);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only one user allowed",
          cause: "Only one user allowed",
        });
      }
      return ctx.prisma.user.create({
        data: {
          name: input.username,
          password: input.password,
        },
      });
    }),
});
