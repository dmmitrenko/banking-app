import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateDepositOfferDto {
  @ApiProperty({ example: 'Universal', description: 'deposit title' })
  @IsString()
  name: string;

  @ApiProperty({ example: '5', description: 'interest rate' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(100)
  interest: number;

  @ApiProperty({ example: '12', description: 'deposit duration in months' })
  @IsInt()
  @Min(1)
  term: number;

  @ApiProperty({ example: 'EUR', description: 'deposit currency' })
  @IsEnum(Currency)
  currency: Currency;
}
