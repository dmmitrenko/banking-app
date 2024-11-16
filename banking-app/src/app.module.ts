import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtAuthGuard } from './application/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './application/auth/guards/role.guard';
import { AdminController } from './presentation/controllers/admin.controller';
import { AccountController } from './presentation/controllers/account.controller';
import { AdminModule } from './application/admin/admin.module';
import { AccountModule } from './application/account/account.module';
import { DepositModule } from './application/deposit/deposit.module';
import { DepositController } from './presentation/controllers/deposit.controller';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    AccountModule,
    InfrastructureModule, 
    DomainModule,
    DepositModule
  ],
  controllers: [
    AuthController,
    AdminController,
    AccountController,
    DepositController
  ],
  providers: [],
})
export class AppModule {}
