/*
  Warnings:

  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionsType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'TRANSFER');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" "TransactionsType" NOT NULL;
