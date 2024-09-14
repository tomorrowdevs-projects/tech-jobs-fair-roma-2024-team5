/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "habits" ADD COLUMN     "abitType" VARCHAR(50),
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "chartPreferences" JSONB,
ADD COLUMN     "notificationPreferences" JSONB;

-- CreateTable
CREATE TABLE "habit_statistics" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "completionRate" DOUBLE PRECISION NOT NULL,
    "streak" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habit_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_tags" (
    "id" SERIAL NOT NULL,
    "tagName" VARCHAR(50) NOT NULL,
    "habitId" INTEGER NOT NULL,

    CONSTRAINT "habit_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "habit_statistics" ADD CONSTRAINT "habit_statistics_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_tags" ADD CONSTRAINT "habit_tags_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
