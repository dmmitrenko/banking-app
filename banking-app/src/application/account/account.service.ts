import { BadRequestException, Inject } from "@nestjs/common";
import Decimal from "decimal.js";
import { IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { CurrencyApiClient } from "src/infrastructure/api_client/currency-api-client";
import { ACCOUNT_IS_CLOSED, ACCOUNT_NOT_FOUND, SHORTAGE_OF_MONEY, USER_IS_BLOCKED, USER_NOT_FOUND } from "src/shared/constants";

export class AccountService{

    constructor(
        @Inject(IAccountRepository) 
        private readonly accountReposity: IAccountRepository,
        @Inject(IUserRepository) 
        private readonly userReposity: IUserRepository,
        private readonly currencyRateApi: CurrencyApiClient
    ){ }

    async openAccount(){

    }

    async closeAccount(){

    }

    async depositMoney(){

    }

    async withdrawMoney(){

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

        if (senderAccount.currency == receiverAccount.currency) {
            return await this.accountReposity.transfer(senderAccount, receiverAccount, amount, amount)
        }

        const rate = await this.currencyRateApi.getExchangeRate(senderAccount.currency, receiverAccount.currency)
        return await this.accountReposity.transfer(senderAccount, receiverAccount, amount, amount.mul(rate))
    }

    async getBalance(){

    }
}