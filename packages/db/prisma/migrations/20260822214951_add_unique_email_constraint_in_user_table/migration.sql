/*
  Warnings:

  - A unique constraint covering the columns `[userId,orgId]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Members_userId_orgId_key" ON "Members"("userId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
