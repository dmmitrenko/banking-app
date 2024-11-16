import { Prisma } from "@prisma/client";

export interface IRepository<T, ID> {
    create(data: Partial<T>, tx?: Prisma.TransactionClient): Promise<T>;
    findAll(tx?: Prisma.TransactionClient): Promise<T[]>;
    findById(id: ID, tx?: Prisma.TransactionClient): Promise<T>;
    update(id: ID, data: Partial<T>, tx?: Prisma.TransactionClient): Promise<T>;
    delete(id: ID, tx?: Prisma.TransactionClient): Promise<void>;
  }