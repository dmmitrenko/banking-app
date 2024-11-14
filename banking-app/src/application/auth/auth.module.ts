import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
    imports:[PrismaModule],
    providers: [
        AuthService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        }
    ],
    exports: [AuthService]
})
export class AuthModule {}
