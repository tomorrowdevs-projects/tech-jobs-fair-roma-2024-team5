import prisma from "../services/prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        notificationPreferences: z.optional(z.any()),
        chartPreferences: z.optional(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({ data: input });
    }),

  find: publicProcedure
    .input(z.object({ username: z.optional(z.string()) }))
    .query(async ({ input }) => {
      return await prisma.user.findMany({
        where: {
          username: { contains: input.username ?? "" },
        },
      });
    }),

  findById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          habits: true,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        notificationPreferences: z.optional(z.any()),
        chartPreferences: z.optional(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.update({ data: input, where: { id: input.id } });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.delete({ where: { id: input.id } });
    }),
});
