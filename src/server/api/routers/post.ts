import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input,
      },
    });
  }),
  savePostDraft: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        id: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (input.id) {
        return ctx.prisma.post.update({
          data: {
            title: input.title,
            content: input.content,
            discoverable: false,
          },
          where: {
            id: input.id,
          },
        }); // TODO 更新
      }
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
        },
        select: {
          id: true,
        },
      });
    }),
});
