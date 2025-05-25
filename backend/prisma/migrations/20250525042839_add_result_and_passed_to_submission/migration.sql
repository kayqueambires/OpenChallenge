/*
  Warnings:

  - Added the required column `passed` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "passed" BOOLEAN NOT NULL,
ADD COLUMN     "result" TEXT NOT NULL;
