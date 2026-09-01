/*
  Warnings:

  - Added the required column `orgId` to the `Invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invites" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
