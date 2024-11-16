/*
  Warnings:

  - You are about to drop the column `accountId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Deposit` table. All the data in the column will be lost.
  - Changed the type of `currency` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `currency` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `currency` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'UAH', 'EUR');

-- DropForeignKey
ALTER TABLE "Deposit" DROP CONSTRAINT "Deposit_accountId_fkey";

-- DropIndex
DROP INDEX "Deposit_accountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "accountId",
DROP COLUMN "amount",
DROP COLUMN "endDate",
DROP COLUMN "rate",
DROP COLUMN "startDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "interest" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "term" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- CreateTable
CREATE TABLE "AccountDeposit" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "depositId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountDeposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountDeposit" ADD CONSTRAINT "AccountDeposit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountDeposit" ADD CONSTRAINT "AccountDeposit_depositId_fkey" FOREIGN KEY ("depositId") REFERENCES "Deposit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
