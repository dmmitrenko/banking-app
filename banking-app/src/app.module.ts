import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtAuthGuard } from './application/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './application/auth/guards/role.guard';

@Module({
  imports: [
    AuthModule,
    InfrastructureModule, 
    DomainModule, 
  ],
  controllers: [
    AuthController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
],
})
export class AppModule {}
