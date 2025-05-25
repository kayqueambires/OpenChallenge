/*
  Warnings:

  - Added the required column `solution` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "solution" TEXT NOT NULL;
