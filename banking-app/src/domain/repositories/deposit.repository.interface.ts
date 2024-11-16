import { Account, Deposit, Prisma } from "@prisma/client";
import { IRepository } from "./repository.interface";
import Decimal from "decimal.js";

export interface IDepositRepository extends IRepository<Deposit, number>{
    getAccountDeposits(accountId: number): Promise<Deposit[]>
    findByTitle(title: string) : Promise<Deposit>
    findActive(): Promise<Deposit[]>
    updateInterest(accountDepositId: number, newPercentage: number): Promise<void>
    openDepositeForAccount(account: Account, deposit: Deposit, amount: Decimal, tx?: Prisma.TransactionClient)
    getAccountDeposite(depositId: number, accountId: number)
}

export const IDepositRepository = Symbol("IDepositRepository");