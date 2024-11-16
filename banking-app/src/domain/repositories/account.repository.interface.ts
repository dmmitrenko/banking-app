import { Account } from "@prisma/client";
import { IRepository } from "./repository.interface";
import Decimal from "decimal.js";

export interface IAccountRepository extends IRepository<Account, number>{
    transfer(sender: Account, receiver : Account, senderAmount: Decimal, receiverAmount: Decimal)
}

export const IAccountRepository = Symbol("IAccountRepository");