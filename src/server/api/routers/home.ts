import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const homeRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.home.findFirst({});
  }),
});
