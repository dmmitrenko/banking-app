import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CurrencyApiClient } from 'src/infrastructure/api_client/currency-api-client';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository.interface';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

@Module({
    imports: [PrismaModule, InfrastructureModule],
    providers: [
        AccountService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        },
        {
            provide: IAccountRepository,
            useClass: AccountRepository
        },
        {
            provide: ITransactionRepository,
            useClass: TransactionRepository
        }
    ],
    exports: [AccountService]
})
export class AccountModule {}
