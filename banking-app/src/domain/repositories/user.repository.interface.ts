
import { User } from "@prisma/client";
import { IRepository } from "./repository.interface";

export interface IUserRepository extends IRepository<User, number>{
    findByEmail(email: string) : Promise<User | null>
}

export const IUserRepository = Symbol("IUserRepository");