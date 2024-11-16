import { BadRequestException, Inject } from "@nestjs/common";
import { CreateDepositOfferDto } from "./dto/create-deposit-offer.dto";
import { IDepositRepository } from "src/domain/repositories/deposit.repository.interface";
import { Deposit } from "src/domain/models/deposit.model";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { OpenDepositDto } from "./dto/open-deposit-dto";
import { ACCOUNT_IS_CLOSED, SHORTAGE_OF_MONEY } from "src/shared/constants";
import Decimal from "decimal.js";
import { Account } from "src/domain/models/account.model";
import { CurrencyApiClient } from "src/infrastructure/api_client/currency-api-client";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { ITransactionRepository } from "src/domain/repositories/transaction.repository.interface";

export class DepositService{

    constructor(
        @Inject(IDepositRepository) 
        private readonly depositReposity: IDepositRepository,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IAccountRepository) 
        private readonly accountReposity: IAccountRepository,
        @Inject(ITransactionRepository) 
        private readonly transactionReposity: ITransactionRepository,
        private readonly currencyApiClient: CurrencyApiClient,
        private readonly prisma: PrismaService
    ) {}

    async getPosibleDepositAmount(account: Account, amount: Decimal, title: string) : Promise<Decimal>{
        const deposit = await this.depositReposity.findByTitle(title)
        
        // compound interest
        const possibleAmount = amount.times(new Decimal(1).plus(new Decimal(deposit.interest / 100)).pow(deposit.term)) 

        return possibleAmount
    }

    async openDeposit(account: Account, amount: Decimal, depositTitle: string){
        const deposit = await this.depositReposity.findByTitle(depositTitle)

        if (account.balance.lessThan(amount)) {
            throw new BadRequestException(SHORTAGE_OF_MONEY)
        }

        if (!account.isActive || !deposit.isActive) {
            throw new BadRequestException(ACCOUNT_IS_CLOSED)
        }

        const rates = await this.currencyApiClient.getCurrencyRates(account.currency, [deposit.currency])
        const rate = rates.data[deposit.currency].value

        await this.prisma.$transaction(async(tx) => {
            await this.accountReposity.update(account.id, {
                balance: account.balance.minus(amount)
            }, tx)

            await this.depositReposity.openDepositeForAccount(account, deposit, amount.mul(new Decimal(rate)), tx)
        })
    }

    async closeDeposit(){

    }

    async getUserDepositsHistory(accountId: number){
        return await this.depositReposity.getAccountDeposits(accountId)
    }

    async createDeposit(dto: CreateDepositOfferDto){
        await this.depositReposity.create(
            {
                name: dto.name,
                interest: dto.interest,
                term: dto.term,
                currency: dto.currency
            }
        )
    }

    async changeDepositPercentage(accountDepositId: number, newInterest: number){
        await this.depositReposity.updateInterest(accountDepositId, newInterest)
    }

    async getAllDeposits() : Promise<Deposit[]>{
        const deposits = await this.depositReposity.findAll()
        return deposits.map((deposit) => new Deposit(deposit))
    }

    async getActiveDeposits() : Promise<Deposit[]>{
        const deposits = await this.depositReposity.findActive()
        return deposits.map((deposit) => new Deposit(deposit))
    }
}