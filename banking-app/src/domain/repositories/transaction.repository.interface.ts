import { Transaction } from "@prisma/client";
import { IRepository } from "./repository.interface";

export interface ITransactionRepository extends IRepository<Transaction, number>{

}

export const ITransactionRepository = Symbol("ITransactionRepository");