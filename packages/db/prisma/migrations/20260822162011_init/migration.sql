/*
  Warnings:

  - Added the required column `status` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('done', 'upcoming', 'in_progress');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'null';
