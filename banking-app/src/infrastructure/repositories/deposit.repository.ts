import { Account, AccountDeposit, Deposit, Prisma } from '@prisma/client';
import { IDepositRepository } from 'src/domain/repositories/deposit.repository.interface';
import { Repository } from './repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import Decimal from 'decimal.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepositRepository
  extends Repository<Deposit, number>
  implements IDepositRepository
{
  protected modelName = 'deposit';

  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async getAccountDeposite(depositId: number, accountId: number) : Promise<AccountDeposit> {
    return await this.prisma.accountDeposit.findFirst({
      where: {
        accountId: accountId,
        depositId: depositId
      }
    })
  }

  async openDepositeForAccount(account: Account, deposit: Deposit, amount: Decimal, tx?: Prisma.TransactionClient) {
    const prismaClient = tx ?? this.prisma;

    await prismaClient.accountDeposit.create({
      data:{
        accountId: account.id,
        depositId: deposit.id,
        amount: amount
      }
    })
  }

  async updateInterest(
    accountDepositId: number,
    newPercentage: number
  ): Promise<void> {
    await this.prisma.accountDeposit.update({
      where: { id: accountDepositId },
      data: { personalInterest: newPercentage }
    });
  }

  async findActive(): Promise<Deposit[]> {
    return await this.prisma.deposit.findMany({
      where: {
        isActive: true
      }
    });
  }

  async getAccountDeposits(accountId: number): Promise<any> {
    const deposits = await this.prisma.accountDeposit.findMany({
      where: {
        accountId: accountId
      },
      include: {
        deposit: true
      }
    });

    return deposits;
  }

  async findByTitle(title: string): Promise<Deposit> {
    return await this.prisma.deposit.findUnique({
      where: { name: title }
    });
  }
}
