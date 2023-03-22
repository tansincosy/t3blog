import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
export const userRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count({});
  }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        csrfToken: z.string(),
      })
    )
    .mutation(() => {
      return {};
    }),
  add: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        csrfToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("client crsf", input.csrfToken);
      console.log("");
      return ctx.prisma.user.create({
        data: {
          name: input.username,
          password: input.password,
        },
      });
    }),
});
