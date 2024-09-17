import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "../services/prisma";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { HabitSchedule } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const habitRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.optional(z.string()),
        startDate: z.optional(z.string()),
        endDate: z.optional(z.string()),
        targetValue: z.number(),
        abitType: z.optional(z.string()),
        priority: z.number(),
        habitSchedules: z
          .array(
            z.object({
              daily: z.boolean(),
              dayOfWeek: z.optional(z.number()),
              dayOfMonth: z.optional(z.number()),
              specificDate: z.optional(z.string().datetime()),
            })
          )
          .min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.habit.create({
        data: {
          ...input,
          habitSchedules: {
            createMany: {
              data: input.habitSchedules,
            },
          },
          habitStatistics: {
            create: {
              streak: 0,
              completionRate: 0,
              endDate: endOfDay(new Date()),
              startDate: startOfDay(new Date()),
            },
          },
          userId: ctx.userid as number,
        },
      });
    }),

  addCompletion: protectedProcedure
    .input(z.object({ habitScheduleId: z.number(), value: z.number() }))
    .mutation(async ({ input }) => {
      const habitSchedule = await prisma.habitSchedule.findUnique({
        where: { id: input.habitScheduleId },
        include: {
          habit: true
        }
      });

      if (!habitSchedule) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid scheduleId' })
      }

      const { habit, habitId } = habitSchedule;

      const currentStatistics = await prisma.habitStatistics.findFirst({
        where: {
          startDate: startOfMonth(new Date()),
          endDate: endOfMonth(new Date()),
          habitId,
        },
      });

      const streak = (currentStatistics?.streak ?? 0) + input.value

      if (!currentStatistics) {
        await prisma.habitStatistics.create({
          data: {
            streak,
            completionRate: streak / Math.max(habit.targetValue, 1),
            habitId,
            endDate: endOfDay(new Date()),
            startDate: startOfDay(new Date()),
          },
        });
      } else {
        await prisma.habitStatistics.update({
          where: { id: currentStatistics.id },
          data: {
            streak,
            completionRate: streak / Math.max(habit.targetValue, 1),
          },
        });
      }

      return await prisma.habitCompletion.create({ data: input });
    }),

  find: protectedProcedure
    .input(z.optional(z.object({ name: z.optional(z.string()) })))
    .query(async ({ ctx, input = {} }) => {
      return await prisma.habit.findMany({
        where: {
          name: { contains: input.name ?? "" },
          userId: ctx.userid as number,
        },
        include: {
          habitTags: true,
          habitStatistics: true,
          habitSchedules: true,
        },
        orderBy: {
          startDate: "desc",
        },
      });
    }),

  findById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.habit.findUnique({
        where: {
          id: input.id,
        },
        include: {
          habitStatistics: true,
          habitTags: true,
          habitSchedules: {
            include: {
              completions: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
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

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.habit.delete({ where: { id: input.id } });
    }),
});
