import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { Repository } from './repository';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SEVERAL_ACTIVE_ACCOUNTS } from 'src/shared/constants';

@Injectable()
export class AccountRepository
  extends Repository<Account, number>
  implements IAccountRepository
{
  protected modelName = 'account';

  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async getUserAccount(userId: number) : Promise<Account> {
    const account = await this.prisma.account.findMany({
      where: {
        userId: userId,
        isActive: true
      }
    })

    if (account.length > 1) {
      throw new InternalServerErrorException(SEVERAL_ACTIVE_ACCOUNTS)
    }

    return account[0]
  }
}
