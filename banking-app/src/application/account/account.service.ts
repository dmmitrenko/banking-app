import { BadRequestException, Inject } from "@nestjs/common";
import { Currency, TransactionsType } from "@prisma/client";
import Decimal from "decimal.js";
import { Account } from "src/domain/models/account.model";
import { IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { ITransactionRepository } from "src/domain/repositories/transaction.repository.interface";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { CurrencyApiClient } from "src/infrastructure/api_client/currency-api-client";
import { ACCOUNT_IS_CLOSED, ACCOUNT_NOT_FOUND, SHORTAGE_OF_MONEY, USER_IS_BLOCKED, USER_NOT_FOUND } from "src/shared/constants";
import { PrismaService } from "src/shared/prisma/prisma.service";

export class AccountService{

    constructor(
        @Inject(IAccountRepository) 
        private readonly accountReposity: IAccountRepository,
        @Inject(IUserRepository) 
        private readonly userReposity: IUserRepository,
        @Inject(ITransactionRepository) 
        private readonly transactionReposity: ITransactionRepository,
        private readonly currencyRateApi: CurrencyApiClient,
        private readonly prisma: PrismaService
    ){ }

    async getUserAccount(userEmail: string) : Promise<Account>{
        const user = await this.userReposity.findByEmail(userEmail)
        const account = await this.accountReposity.getUserAccount(user.id)

        if (!account) {
            throw new BadRequestException(ACCOUNT_NOT_FOUND)
        }

        return new Account(account)
    }

    async openAccount(email: string, currency: Currency){
        const user = await this.userReposity.findByEmail(email)
        await this.accountReposity.create({
            balance: new Decimal(0),
            currency: currency,
            isActive: true,
            userId: user.id
        })
    }

    async closeAccount(accountId: number){
        await this.accountReposity.update(accountId, {
            isActive: false
        })
    }

    async depositMoney(amount: Decimal, accountId: number){
        const account = await this.accountReposity.findById(accountId)
        const user = await this.userReposity.findById(account.userId)

        if (!account.isActive || user.isBlocked) {
            throw new BadRequestException(ACCOUNT_IS_CLOSED)
        }

        this.prisma.$transaction(async(tx) => {
            await this.accountReposity.update(
                accountId, 
                {
                balance: account.balance.add(amount)
                },
                tx
            )

            await this.transactionReposity.create({
                accountId: accountId,
                currency: account.currency,
                amount: amount,
                type: TransactionsType.DEPOSIT
            }, tx)
        })
    }

    async withdrawMoney(amount: Decimal, accountId: number){
        const account = await this.accountReposity.findById(accountId)
        if (!account.isActive) {
            throw new BadRequestException(ACCOUNT_IS_CLOSED)
        }

        if (account.balance.lessThan(amount)) {
            throw new BadRequestException(SHORTAGE_OF_MONEY)
        }

        return this.prisma.$transaction(async(tx) => {
            await this.accountReposity.update(accountId, {
                balance: account.balance.minus(amount)
            }, tx)

            await this.transactionReposity.create({
                accountId: accountId,
                currency: account.currency,
                amount: amount,
                type: TransactionsType.WITHDRAWAL
            }, tx)
        })
    }

    async transferMoney(senderEmail: string, receiverEmail: string, amount: Decimal){
        const sender = await this.userReposity.findByEmail(senderEmail)
        const receiver = await this.userReposity.findByEmail(receiverEmail)

        if (!receiver || !sender) {
            throw new BadRequestException(USER_NOT_FOUND)
        }

        if (receiver.isBlocked || sender.isBlocked) {
            throw new BadRequestException(USER_IS_BLOCKED)
        }

        const senderAccount = await this.accountReposity.findById(sender.id)
        const receiverAccount = await this.accountReposity.findById(receiver.id)

        if (!senderAccount || !receiverAccount) {
            throw new BadRequestException(ACCOUNT_NOT_FOUND)
        }

        if (!senderAccount.isActive || !receiverAccount.isActive) {
            throw new BadRequestException(ACCOUNT_IS_CLOSED)
        }

        if (senderAccount.balance < amount) {
            throw new BadRequestException(SHORTAGE_OF_MONEY)
        }

        const rate = await this.currencyRateApi.getExchangeRate(senderAccount.currency, receiverAccount.currency)

        return this.prisma.$transaction(async(tx) => {
            await this.accountReposity.update(senderAccount.id, {
                balance: senderAccount.balance.minus(amount)
            }, tx);

            await this.accountReposity.update(receiverAccount.id, {
                balance: receiverAccount.balance.mul(rate)
            }, tx)

            await this.transactionReposity.create({
                accountId: sender.id,
                targetAccountId: receiver.id,
                amount: amount,
                currency: senderAccount.currency,
                type: TransactionsType.TRANSFER
            }, tx)
        })
    }

    async getBalance(accountId: number) : Promise<Decimal> {
        const account = await this.accountReposity.findById(accountId)
        return account.balance
    }

    async getUserTransactions(userId: number){
        
    }
}