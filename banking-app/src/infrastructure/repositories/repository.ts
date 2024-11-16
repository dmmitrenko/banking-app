import { Prisma } from "@prisma/client";
import { IRepository } from "src/domain/repositories/repository.interface";
import { PrismaService } from "src/shared/prisma/prisma.service";

export abstract class Repository<T, ID> implements IRepository<T, ID> {
    protected readonly prisma: PrismaService;
    protected abstract readonly modelName: string;
  
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }
  
    protected getModel(tx?: Prisma.TransactionClient) {
      const prismaClient = tx ?? this.prisma;
      return prismaClient[this.modelName];
    }
  
    create(data: Partial<T>, tx?: Prisma.TransactionClient): Promise<T> {
      return this.getModel(tx).create({ data });
    }
  
    findAll(tx?: Prisma.TransactionClient): Promise<T[]> {
      return this.getModel(tx).findMany();
    }
  
    findById(id: ID, tx?: Prisma.TransactionClient): Promise<T> {
      return this.getModel(tx).findUnique({ where: { id } });
    }
  
    update(id: ID, data: Partial<T>, tx?: Prisma.TransactionClient): Promise<T> {
      return this.getModel(tx).update({
        where: { id },
        data,
      });
    }
  
    async delete(id: ID, tx?: Prisma.TransactionClient): Promise<void> {
      await this.getModel(tx).delete({ where: { id } });
    }
  }