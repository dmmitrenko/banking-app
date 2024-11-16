/*
  Warnings:

  - You are about to drop the column `typeId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Transaction_typeId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "typeId";
