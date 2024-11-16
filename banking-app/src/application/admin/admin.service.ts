import { BadRequestException, Inject } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { IAccountRepository } from "src/domain/repositories/account.repository.interface";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { USER_NOT_FOUND } from "src/shared/constants";

export class AdminService{

    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IAccountRepository) 
        private readonly accountReposity: IAccountRepository
    ) {}

    async getUserInformation(email: string): Promise<User>{
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new BadRequestException(USER_NOT_FOUND)
        }

        return new User(user)
    }

    async blockUser(email: string){
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new BadRequestException(USER_NOT_FOUND)
        }

        this.userRepository.blockUser(user)
    }

    async getUserTransactions(userId: number){
        
    }

    
}