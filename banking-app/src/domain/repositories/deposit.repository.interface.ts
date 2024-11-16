import { Deposit } from "@prisma/client";
import { IRepository } from "./repository.interface";

export interface IDepositRepository extends IRepository<Deposit, number>{
    getAccountDeposits(accountId: number): Promise<Deposit[]>
    findByTitle(title: string) : Promise<Deposit>
}

export const IDepositRepository = Symbol("IDepositRepository");