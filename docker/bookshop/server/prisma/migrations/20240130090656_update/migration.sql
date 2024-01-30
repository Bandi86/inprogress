/*
  Warnings:

  - Added the required column `birthDate` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfPages` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://via.placeholder.com/150';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "numberOfPages" INTEGER NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Carts" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
