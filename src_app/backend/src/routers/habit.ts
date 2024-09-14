import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import prisma from "../services/prisma";

export const habitRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.optional(z.string()),
        frequency: z.string(),
        userId: z.number(),
        startDate: z.date(),
        endDate: z.optional(z.string()),
        targetValue: z.number(),
        abitType: z.optional(z.string()),
        priority: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.habit.create({ data: input });
    }),

  addCompletion: publicProcedure
    .input(z.object({ habitScheduleId: z.number(), value: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.habitCompletion.create({ data: input });
    }),

  find: publicProcedure
    .input(z.object({ name: z.optional(z.string()) }))
    .query(async ({ input }) => {
      return await prisma.habit.findMany({
        where: {
          name: { contains: input.name ?? "" },
        },
        include: {
          HabitStatistics: true,
          HabitTags: true,
        },
      });
    }),

  findById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.habit.findUnique({
        where: {
          id: input.id,
        },
        include: {
          HabitStatistics: true,
          HabitTags: true,
          habitSchedules: {
            include: {
              completions: true,
            },
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        frequency: z.optional(z.string()),
        userId: z.optional(z.number()),
        startDate: z.optional(z.date()),
        endDate: z.optional(z.string()),
        targetValue: z.optional(z.number()),
        abitType: z.optional(z.string()),
        priority: z.optional(z.number()),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.habit.update({
        data: input,
        where: { id: input.id },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.habit.delete({ where: { id: input.id } });
    }),
});
