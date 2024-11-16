import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrencyApiClient } from './api_client/currency-api-client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CurrencyApiClient],
  exports: [CurrencyApiClient]
})
export class InfrastructureModule {}
