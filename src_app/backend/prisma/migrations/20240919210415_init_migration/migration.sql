/*
  Warnings:

  - You are about to drop the column `habitScheduleId` on the `habit_completions` table. All the data in the column will be lost.
  - You are about to drop the column `habitScheduleId` on the `notifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[habitId]` on the table `habit_schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `habitId` to the `habit_completions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "habit_completions" DROP CONSTRAINT "habit_completions_habitScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_habitScheduleId_fkey";

-- AlterTable
ALTER TABLE "habit_completions" DROP COLUMN "habitScheduleId",
ADD COLUMN     "habitId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "habit_statistics" ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "habits" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "habitScheduleId",
ADD COLUMN     "habitId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "habit_schedule_habitId_key" ON "habit_schedule"("habitId");

-- AddForeignKey
ALTER TABLE "habit_completions" ADD CONSTRAINT "habit_completions_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
