/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");
