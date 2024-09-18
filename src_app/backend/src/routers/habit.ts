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
        priority: z.optional(z.number()),
        habitSchedule: z.object({
          daily: z.boolean(),
          dayOfWeek: z.optional(z.number()),
          dayOfMonth: z.optional(z.number()),
          specificDate: z.optional(z.string().datetime()),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.habit.create({
        data: {
          ...input,
          habitSchedule: {
            create: input.habitSchedule,
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
    .input(z.object({ habitId: z.number(), value: z.number() }))
    .mutation(async ({ input }) => {
      const { habitId } = input;

      const habit = await prisma.habit.findUnique({ where: { id: habitId } });

      if (!habit) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid habit id",
        });
      }

      const currentStatistics = await prisma.habitStatistics.findFirst({
        where: {
          startDate: {
            lte: new Date(),
          },
          endDate: {
            gte: new Date(),
          },
          habitId,
        },
      });

      const streak = (currentStatistics?.streak ?? 0) + input.value;

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
    .input(
      z.optional(
        z.object({
          name: z.optional(z.string()),
          active: z.optional(z.boolean()),
        })
      )
    )
    .query(async ({ ctx, input = {} }) => {
      return await prisma.habit.findMany({
        where: {
          name: { contains: input.name ?? "" },
          userId: ctx.userid as number,
          ...(!input.active ? {} : {
            startDate: {
              lte: new Date()
            },
            endDate: {
              gte: new Date()
            }
          })
        },
        include: {
          habitTags: true,
          habitStatistics: true,
          habitSchedule: true,
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
          habitSchedule: true,
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
      const { id } = input;

      await prisma.notification.deleteMany({ where: { habitId: id } });
      await prisma.habitCompletion.deleteMany({ where: { habitId: id } });
      await prisma.habitStatistics.deleteMany({ where: { habitId: id } });
      await prisma.habitSchedule.deleteMany({ where: { habitId: id } });

      return await prisma.habit.delete({ where: { id: input.id } });
    }),
});
