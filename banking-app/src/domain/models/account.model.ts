export class Account {
    readonly id: number;
    readonly balance: string;
    readonly currency: string;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly userId: number;

  constructor(account: {
    id: number;
    balance: string;
    currency: string;
    isActive: boolean;
    createdAt: Date;
    userId: number;
  }) {
    this.id = account.id
    this.balance = account.balance
    this.currency = account.currency
    this.isActive = account.isActive
    this.createdAt = account.createdAt
    this.userId = account.userId
  }
}
