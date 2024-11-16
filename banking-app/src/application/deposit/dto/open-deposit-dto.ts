import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";

export class OpenDepositDto{
    @IsString()
    @IsNotEmpty()
    depositTitle: string;
  
    @IsNumber()
    @IsPositive()
    startAmount: number;
}