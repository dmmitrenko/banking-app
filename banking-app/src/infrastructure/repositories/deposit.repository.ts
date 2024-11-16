import { Deposit } from "@prisma/client";
import { IDepositRepository } from "src/domain/repositories/deposit.repository.interface";
import { Repository } from "./repository";
import { PrismaService } from "src/shared/prisma/prisma.service";
import Decimal from "decimal.js";

export class DepositRepository extends Repository<Deposit, number> implements IDepositRepository{
    protected modelName = 'deposit';

    constructor(readonly prisma: PrismaService) {
        super(prisma);

    }

    async getAccountDeposits(accountId: number): Promise<Deposit[]> {
        const deposits = await this.prisma.deposit.findMany({
          where: {
            accounts: {
              some: {
                accountId: accountId,
              },
            },
          },
        });
      
        return deposits;
    }

    async openDiposite(accountId: number, depositId: number, durationInMonths: number, amount: Decimal){
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + durationInMonths);

        await this.prisma.accountDeposit.create({
            data: {
                accountId: accountId,
                depositId: depositId,
                startDate: startDate,
                endDate: endDate,
                amount: amount
            }
        })
    }

    async findByTitle(title: string) : Promise<Deposit>{
      return await this.prisma.deposit.findUnique({
        where: {name: title}
      })
    }
}