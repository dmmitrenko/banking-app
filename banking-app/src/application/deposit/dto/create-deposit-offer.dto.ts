import { Currency } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateDepositOfferDto {
  @IsString()
  name: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(100)
  interest: number;

  @IsInt()
  @Min(1)
  term: number;

  @IsEnum(Currency)
  currency: Currency;
}
