import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { Repository } from './repository';
import { Account, TransactionsType } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository
  extends Repository<Account, number>
  implements IAccountRepository
{
  protected modelName = 'account';

  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }
    
}
