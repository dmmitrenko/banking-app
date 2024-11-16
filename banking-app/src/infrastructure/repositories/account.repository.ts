import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { Repository } from './repository';
import { Account, TransactionsType } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import Decimal from 'decimal.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository
  extends Repository<Account, number>
  implements IAccountRepository
{
  protected model: any;

  constructor(readonly prisma: PrismaService) {
    super(prisma);
    this.model = prisma.account;
  }
  transfer(
    sender: Account,
    receiver: Account,
    senderAmount: Decimal,
    receiverAmount: Decimal
  ) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.transaction.create({
        data: {
          accountId: sender.id,
          targetAccountId: receiver.id,
          amount: senderAmount,
          currency: sender.currency,
          type: TransactionsType.TRANSFER
        }
      });

      await prisma.account.update({
        where: { id: sender.id },
        data: { balance: { decrement: senderAmount } }
      });

      await prisma.account.update({
        where: { id: sender.id },
        data: { balance: { increment: receiverAmount } }
      });
    });
  }
}
