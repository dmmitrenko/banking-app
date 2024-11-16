import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtAuthGuard } from './application/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './application/auth/guards/role.guard';
import { AdminController } from './presentation/controllers/admin.controller';
import { UserController } from './presentation/controllers/user.controller';
import { AdminModule } from './application/admin/admin.module';
import { AccountModule } from './application/account/account.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    AccountModule,
    InfrastructureModule, 
    DomainModule, 
  ],
  controllers: [
    AuthController,
    AdminController,
    UserController
  ],
  providers: [],
})
export class AppModule {}
