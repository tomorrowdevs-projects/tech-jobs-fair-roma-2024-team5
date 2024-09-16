import { startOfDay, startOfMonth } from "date-fns";
import prisma from "./prisma";

export async function sendNotification() {
  const today = startOfDay(new Date());

  // check for habit schedules to be notified
  const habitsToNotify = await prisma.habitSchedule.findMany({
    distinct: "habitId",
    where: {
      OR: [
        {
          dayOfWeek: today.getDay(),
        },
        {
          dayOfMonth: today.getDate(),
        },
        {
          daily: true,
        },
        {
          specificDate: today,
        }
      ],
      // do not send if action has already been completed
      completions: {
        none: {
          completedAt: {
            gt: today
          }
        }
      },
      // do not send if a notification has already been sent
      notifications: {
        none: {
          createdAt: {
            gt: today,
          },
        },
      },
    },
    include: {
      habit: true
    }
  });
  
  await prisma.notification.createMany({
    data: habitsToNotify.map((schedule) => ({
      title: schedule.habit.name,
      message: schedule.habit.description ?? '',
      userId: schedule.habit.userId,
      habitScheduleId: schedule.id,
    })),
  });
  
  console.log(`[notification_service]: sending notifications for habits {${habitsToNotify.map(schedule => schedule.habitId).join(',')}}`);
}
