/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Members" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
