import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class OpenDepositDto{
    @ApiProperty({ example: 'Universal', description: 'selected deposit title' })
    @IsString()
    @IsNotEmpty()
    depositTitle: string;
  
    @ApiProperty({ example: '50', description: 'initial deposit amount' })
    @IsNumber()
    @IsPositive()
    startAmount: number;
}