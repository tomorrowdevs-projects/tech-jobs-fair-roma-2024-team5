// import { startOfDay, startOfMonth } from "date-fns";
// import prisma from "./prisma";

// export async function sendNotification() {
//   const today = startOfDay(new Date());

//   // check for habit schedules to be notified
//   const habitsToNotify = await prisma.habit.findMany({
//     where: {
//       startDate: {lte: new Date()},
//       OR: [
//         {endDate: {
//           gte: new Date()
//         },},
//         {
//           endDate: null
//         }
//       ],
//       // do not send if action has already been completed
//       completions: {
//         none: {
//           completedAt: {
//             gt: today
//           }
//         }
//       },
//       // do not send if a notification has already been sent
//       notifications: {
//         none: {
//           createdAt: {
//             gt: today,
//           },
//         },
//       },
//     },
//   });
  
//   await prisma.notification.createMany({
//     data: habitsToNotify.map((habit) => ({
//       habitId: habit.id,
//       title: habit.name,
//       message: habit.description ?? '',
//       userId: habit.userId,
//     })),
//   });
  
//   console.log(`[notification_service]: sending notifications for habits {${habitsToNotify.map(habit => habit.id).join(',')}}`);
// }
