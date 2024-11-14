import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    AuthModule,
    InfrastructureModule, 
    DomainModule, 
  ],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
