import { Currency } from "@prisma/client";
import { IsEnum } from "class-validator";

export class OpenAccountDto{
    @IsEnum(Currency)
    currency: Currency
}