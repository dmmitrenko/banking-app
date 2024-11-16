import { Currency } from "@prisma/client";
import Decimal from "decimal.js";

export class Account {
    readonly id: number;
    readonly balance: Decimal;
    readonly currency: Currency;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly userId: number;
    readonly personalInterest?: number;

  constructor(account: {
    id: number;
    balance: Decimal;
    currency: Currency;
    isActive: boolean;
    createdAt: Date;
    userId: number;
    personalInterest?: number;
  }) {
    this.id = account.id
    this.balance = account.balance
    this.currency = account.currency
    this.isActive = account.isActive
    this.createdAt = account.createdAt
    this.userId = account.userId
    this.personalInterest = this.personalInterest
  }
}
