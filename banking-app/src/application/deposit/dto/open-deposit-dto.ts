import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from "class-validator";
import Decimal from "decimal.js"

export class OpenDepositDto{
    @IsInt()
    @IsPositive()
    accountId: number; 
  
    @IsString()
    @IsNotEmpty()
    depositTitle: string;
  
    @ValidateNested()
    @Type(() => Decimal)
    @IsPositive()
    startAmount: Decimal;
}