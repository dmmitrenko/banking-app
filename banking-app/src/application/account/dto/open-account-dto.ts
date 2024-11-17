import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "@prisma/client";
import { IsEnum } from "class-validator";

export class OpenAccountDto{
    
    @ApiProperty({ example: 'UAH', description: 'account currency' })
    @IsEnum(Currency)
    currency: Currency
}