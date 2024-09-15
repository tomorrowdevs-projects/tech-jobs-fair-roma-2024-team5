import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Crea utenti
    const user1 = await prisma.user.create({
      data: {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        habits: {
          create: [
            {
              name: 'Read a book',
              description: 'Read at least 30 pages',
              startDate: new Date('2024-01-01'),
              targetValue: 30,
              habitSchedules: {
                create: [
                  {
                    daily: true,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log('User1 created:', user1);
  } catch (error) {
    console.error('User1 already exists or another error occurred:', error);
  }

  try {
    const user2 = await prisma.user.create({
      data: {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password456',
        habits: {
          create: [
            {
              name: 'Exercise',
              description: '30 minutes of exercise',
              startDate: new Date('2024-01-01'),
              targetValue: 30,
              habitSchedules: {
                create: [
                  {
                    daily: true,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log('User2 created:', user2);
  } catch (error) {
    console.error('User2 already exists or another error occurred:', error);
  }

  try {
    // Crea abitudini
    const habit1 = await prisma.habit.create({
      data: {
        userId: 1, // Assumendo che l'ID dell'utente sia 1
        name: 'Meditation',
        description: 'Meditate for 20 minutes',
        startDate: new Date('2024-01-01'),
        targetValue: 20,
        habitSchedules: {
          create: [
            {
              daily: true,
            },
          ],
        },
      },
    });
    console.log('Habit1 created:', habit1);
  } catch (error) {
    console.error('Habit1 already exists or another error occurred:', error);
  }

  try {
    const habit2 = await prisma.habit.create({
      data: {
        userId: 2, // Assumendo che l'ID dell'utente sia 2
        name: 'Jogging',
        description: 'Jog for 30 minutes',
        startDate: new Date('2024-01-01'),
        targetValue: 30,
        habitSchedules: {
          create: [
            {
              daily: true,
            },
          ],
        },
      },
    });
    console.log('Habit2 created:', habit2);
  } catch (error) {
    console.error('Habit2 already exists or another error occurred:', error);
  }

  try {
    // Crea notifiche
    const notification1 = await prisma.notification.create({
      data: {
        title: 'Reminder',
        message: 'Time to meditate!',
        userId: 1, // Assumendo che l'ID dell'utente sia 1
      },
    });
    console.log('Notification1 created:', notification1);
  } catch (error) {
    console.error('Notification1 already exists or another error occurred:', error);
  }

  try {
    const notification2 = await prisma.notification.create({
      data: {
        title: 'Reminder',
        message: 'Time to jog!',
        userId: 2, // Assumendo che l'ID dell'utente sia 2
      },
    });
    console.log('Notification2 created:', notification2);
  } catch (error) {
    console.error('Notification2 already exists or another error occurred:', error);
  }

  try {
    // Crea abitudini condivise
    const sharedHabit1 = await prisma.sharedHabit.create({
      data: {
        habitId: 1, // Assumendo che l'ID dell'abitudine sia 1
        sharedWithUserId: 2, // Assumendo che l'ID dell'utente sia 2
      },
    });
    console.log('SharedHabit1 created:', sharedHabit1);
  } catch (error) {
    console.error('SharedHabit1 already exists or another error occurred:', error);
  }

  try {
    const sharedHabit2 = await prisma.sharedHabit.create({
      data: {
        habitId: 2, // Assumendo che l'ID dell'abitudine sia 2
        sharedWithUserId: 1, // Assumendo che l'ID dell'utente sia 1
      },
    });
    console.log('SharedHabit2 created:', sharedHabit2);
  } catch (error) {
    console.error('SharedHabit2 already exists or another error occurred:', error);
  }

  try {
    // Crea statistiche delle abitudini
    const habitStatistics1 = await prisma.habitStatistics.create({
      data: {
        habitId: 1, // Assumendo che l'ID dell'abitudine sia 1
        endDate: new Date('2024-12-31'),
        completionRate: 0.9,
        streak: 10,
      },
    });
    console.log('HabitStatistics1 created:', habitStatistics1);
  } catch (error) {
    console.error('HabitStatistics1 already exists or another error occurred:', error);
  }

  try {
    const habitStatistics2 = await prisma.habitStatistics.create({
      data: {
        habitId: 2, // Assumendo che l'ID dell'abitudine sia 2
        endDate: new Date('2024-12-31'),
        completionRate: 0.8,
        streak: 8,
      },
    });
    console.log('HabitStatistics2 created:', habitStatistics2);
  } catch (error) {
    console.error('HabitStatistics2 already exists or another error occurred:', error);
  }

  try {
    // Crea tag delle abitudini
    const habitTag1 = await prisma.habitTags.create({
      data: {
        tagName: 'Health',
        habitId: 1, // Assumendo che l'ID dell'abitudine sia 1
      },
    });
    console.log('HabitTag1 created:', habitTag1);
  } catch (error) {
    console.error('HabitTag1 already exists or another error occurred:', error);
  }

  try {
    const habitTag2 = await prisma.habitTags.create({
      data: {
        tagName: 'Fitness',
        habitId: 2, // Assumendo che l'ID dell'abitudine sia 2
      },
    });
    console.log('HabitTag2 created:', habitTag2);
  } catch (error) {
    console.error('HabitTag2 already exists or another error occurred:', error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
