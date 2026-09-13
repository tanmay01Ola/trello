/*
  Warnings:

  - A unique constraint covering the columns `[BoardName,orgId]` on the table `Boards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Boards_BoardName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Boards_BoardName_orgId_key" ON "Boards"("BoardName", "orgId");
