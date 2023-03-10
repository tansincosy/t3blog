import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  draft: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.post.findFirst({
      where: {
        id: input,
      },
    });
  }),
  getId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
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
          select: {
            id: true,
          },
        });
      }
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          description: "",
        },
        select: {
          id: true,
        },
      });
    }),
});
