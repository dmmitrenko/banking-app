import { IRepository } from "src/domain/repositories/repository.interface";
import { PrismaService } from "src/shared/prisma/prisma.service";

export abstract class Repository<T, ID> implements IRepository<T, ID>{
    protected readonly prisma: PrismaService
    protected readonly abstract model: any;

    constructor(prisma: PrismaService) {
        this.prisma = prisma;
    }

    create(data: Partial<T>): Promise<T> {
        return this.model.create({ data });
    }

    findAll(): Promise<T[]> {
        return this.model.findMany();
    }

    findById(id: ID): Promise<T> {
        return this.model.findUnique({ where: { id } });
    }

    update(id: ID, data: Partial<T>): Promise<T> {
        return this.model.update({
            where: { id },
            data,
          });
    }
    
    async delete(id: ID): Promise<void> {
        await this.model.delete({ where: { id } });
    }
}