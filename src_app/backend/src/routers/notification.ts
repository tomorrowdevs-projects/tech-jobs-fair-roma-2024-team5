import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "../services/prisma";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

export const notificationRouter = router({
  find: protectedProcedure
    .input(z.optional(z.object({ name: z.optional(z.string()) })))
    .query(async ({ ctx, input = {} }) => {
      return await prisma.notification.findMany({
        where: {
          userId: ctx.userid as number,
        }
      });
    }),

  findById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.notification.findUnique({
        where: {
          id: input.id,
        }
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.notification.delete({ where: { id: input.id } });
    }),
});
