/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "description" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");
