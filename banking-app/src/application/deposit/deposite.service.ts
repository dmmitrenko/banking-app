import { BadRequestException, Inject } from "@nestjs/common";
import { CreateDepositOfferDto } from "./dto/create-deposit-offer.dto";
import { IDepositRepository } from "src/domain/repositories/deposit.repository.interface";
import { Deposit } from "src/domain/models/deposit.model";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { OpenDepositDto } from "./dto/open-deposit-dto";
import { ACCOUNT_IS_CLOSED, SHORTAGE_OF_MONEY } from "src/shared/constants";

export class DepositService{

    constructor(
        @Inject(IDepositRepository) 
        private readonly depositReposity: IDepositRepository,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IAccountRepository) 
        private readonly accountReposity: IAccountRepository
    ) {}

    async getPosibleDepositAmount(){

    }

    async openDeposit(dto: OpenDepositDto){
        const account = await this.accountReposity.findById(dto.accountId)
        const deposit = await this.depositReposity.findByTitle(dto.depositTitle)

        if (account.balance < dto.startAmount) {
            throw new BadRequestException(SHORTAGE_OF_MONEY)
        }

        if (!account.isActive || !deposit.isActive) {
            throw new BadRequestException(ACCOUNT_IS_CLOSED)
        }

        //TODO: rate convertaion
    }

    async closeDeposit(){

    }

    async getUserDepositsHistory(accountId: number){
        const deposits = await this.depositReposity.getAccountDeposits(accountId)
        return deposits.map((deposit) => new Deposit(deposit));
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

    async changeDepositPercentage(depositId: number, newInterest: number){
        await this.depositReposity.update(depositId, {
            interest: newInterest
        })
    }
}