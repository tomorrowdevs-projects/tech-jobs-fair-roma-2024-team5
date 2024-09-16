import { startOfDay, startOfMonth } from "date-fns";
import prisma from "./prisma";

export async function sendNotification() {
  const today = startOfDay(new Date());

  // check for habit schedules to be notified
  const habitsToNotify = await prisma.habitSchedule.findMany({
    where: {
      OR: [
        {
          dayOfWeek: today.getDay(),
        },
        {
          dayOfMonth: today.getMonth(),
        },
        {
          daily: true,
        },
        {
          specificDate: today
        }
      ],
      // do not send notifications twice per day
      notifications: {
        none: {
          createdAt: {
            gt: today,
          },
        },
      },
    },
    include: {
      habit: true,
    },
  });

  await prisma.notification.createMany({
    data: habitsToNotify.map((schedule) => ({
      title: schedule.habit.name,
      message: "Remind me!",
      userId: schedule.habit.userId,
      habitScheduleId: schedule.id,
    })),
  });

  // actually send notification
}
