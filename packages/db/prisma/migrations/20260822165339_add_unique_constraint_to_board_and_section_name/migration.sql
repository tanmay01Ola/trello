/*
  Warnings:

  - A unique constraint covering the columns `[BoardName]` on the table `Boards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Boards_BoardName_key" ON "Boards"("BoardName");

-- CreateIndex
CREATE UNIQUE INDEX "Section_title_key" ON "Section"("title");
