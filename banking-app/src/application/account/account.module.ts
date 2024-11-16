import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CurrencyApiClient } from 'src/infrastructure/api_client/currency-api-client';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

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
        CurrencyApiClient
    ],
    exports: [AccountService]
})
export class AccountModule {}
