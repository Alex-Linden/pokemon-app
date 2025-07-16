/*
  Warnings:

  - The primary key for the `Pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `pokemonId` on the `Caught` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Caught" DROP CONSTRAINT "Caught_pokemonId_fkey";

-- AlterTable
ALTER TABLE "Caught" DROP COLUMN "pokemonId",
ADD COLUMN     "pokemonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Caught_userId_pokemonId_key" ON "Caught"("userId", "pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_id_key" ON "Pokemon"("id");

-- AddForeignKey
ALTER TABLE "Caught" ADD CONSTRAINT "Caught_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
