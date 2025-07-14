/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ability` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "ability" TEXT NOT NULL,
ADD COLUMN     "attack" INTEGER NOT NULL,
ADD COLUMN     "defense" INTEGER NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "hp" INTEGER NOT NULL,
ADD COLUMN     "speed" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
