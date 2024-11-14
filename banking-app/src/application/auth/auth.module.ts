import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/shared/configs/jwt.config';

@Module({
    imports:[PrismaModule, JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: getJwtConfig
    })],
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
