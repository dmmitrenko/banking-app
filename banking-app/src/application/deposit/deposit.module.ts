import { Module } from '@nestjs/common';
import { DepositService } from './deposite.service';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { IDepositRepository } from 'src/domain/repositories/deposit.repository.interface';
import { DepositRepository } from 'src/infrastructure/repositories/deposit.repository';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
    imports:[PrismaModule],
    providers: [
        DepositService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        },
        {
            provide: IAccountRepository,
            useClass: AccountRepository
        },
        {
            provide: IDepositRepository,
            useClass: DepositRepository
        }
    ],
    exports:[DepositService]
})
export class DepositModule {}
