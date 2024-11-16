import { Account } from "@prisma/client";
import { IRepository } from "./repository.interface";

export interface IAccountRepository extends IRepository<Account, number>{
    getUserAccount(userId: number) : Promise<Account>
}

export const IAccountRepository = Symbol("IAccountRepository");