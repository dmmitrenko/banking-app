import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';

@Module({
    imports:[PrismaModule],
    providers: [
        AdminService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        },
        {
            provide: IAccountRepository,
            useClass: AccountRepository
        }
    ],
    exports:[AdminService]
})
export class AdminModule {}
