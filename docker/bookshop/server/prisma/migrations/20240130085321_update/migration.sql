/*
  Warnings:

  - You are about to drop the `Authors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "stock" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "isbn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "rating" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Authors";

-- CreateTable
CREATE TABLE "Author" (
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("authorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;
