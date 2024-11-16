import { Currency } from "@prisma/client";

export class Deposit {
    readonly id: number;
    readonly name: string;
    readonly interest: number;
    readonly term: number;
    readonly isActive: boolean;
    readonly currency: Currency;
    readonly createdAt: Date;
    readonly updatedAt: Date;

  constructor(deposit: {
    id: number;
    name: string;
    interest: number;
    term: number;
    isActive: boolean;
    currency: Currency;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = deposit.id
    this.name = deposit.name
    this.interest = deposit.interest
    this.term = deposit.term
    this.isActive = deposit.isActive
    this.currency = deposit.currency
    this.createdAt = deposit.createdAt
    this.updatedAt = deposit.updatedAt
  }
}
