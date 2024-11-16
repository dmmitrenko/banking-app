/*
  Warnings:

  - You are about to drop the `TransactionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_typeId_fkey";

-- DropTable
DROP TABLE "TransactionType";
