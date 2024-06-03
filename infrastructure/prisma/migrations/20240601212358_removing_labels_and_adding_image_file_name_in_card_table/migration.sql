/*
  Warnings:

  - You are about to drop the column `labels` on the `Card` table. All the data in the column will be lost.
  - Added the required column `imageFileName` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "labels",
ADD COLUMN     "imageFileName" TEXT NOT NULL;
