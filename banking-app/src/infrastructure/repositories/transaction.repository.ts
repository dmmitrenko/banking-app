import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Transaction } from "@prisma/client";
import { ITransactionRepository } from "src/domain/repositories/transaction.repository.interface";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class TransactionRepository extends Repository<Transaction, number> implements ITransactionRepository {
    protected modelName = 'transaction';

    constructor(readonly prisma: PrismaService) {
        super(prisma);

    }
}