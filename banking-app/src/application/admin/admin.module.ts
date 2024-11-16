import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
    imports:[PrismaModule],
    providers: [
        AdminService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        }
    ],
    exports:[AdminService]
})
export class AdminModule {}
