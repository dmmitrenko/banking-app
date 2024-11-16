import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { Currency } from "@prisma/client"
import Decimal from "decimal.js"
import { AccountService } from "src/application/account/account.service"
import { OpenAccountDto } from "src/application/account/dto/open-account-dto"
import { JwtAuthGuard } from "src/application/auth/guards/auth.guard"
import { DepositService } from "src/application/deposit/deposite.service"
import { OpenDepositDto } from "src/application/deposit/dto/open-deposit-dto"
import { GetUser } from "src/shared/decorators/roles.decorator"

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController{
    constructor(
        private readonly accountService: AccountService,
        private readonly depositService: DepositService){ }

    @Post('/tranfer/:email')
    async transferMoney(
        @Param('email') recipientEmail: string,
        @Body() body: { amount: number },
        @GetUser('email') senderEmail: string
    ) {
        const { amount } = body

        const transaction = await this.accountService.transferMoney(senderEmail, recipientEmail, new Decimal(amount))
        return {
            message: `Successfully transferred ${amount} from ${senderEmail} to ${recipientEmail}`,
            transaction,
        }
    }

    @Post('/deposit/:amount')
  async openDeposit(
        @Param('amount') amount: string, 
        @GetUser('email') email: string,
    ) {
    const decimalAmount = new Decimal(amount);

    const account = await this.accountService.getUserAccountId(email);
    await this.accountService.depositMoney(decimalAmount, account.id);

    return {
      message: 'Successfully funded',
    };
  }

    @Post('open-account')
    async openAccount(@Body() dto: OpenAccountDto, @GetUser('email') email: string){
        await this.accountService.openAccount(email, dto.currency)
    }

    @Post('close-account')
    async closeAccount(@GetUser('email') email: string){
        const account = await this.accountService.getUserAccountId(email)
        await this.accountService.closeAccount(account.id)
    }

    @Post('withdraw-money/:amount')
    async withdrawMoney(
        @GetUser('email') email: string,
        @Param('amount') amount: Decimal){
        const account = await this.accountService.getUserAccountId(email)
        await this.accountService.withdrawMoney(amount, account.id)
    }

    @Get('balance/:currency')
    async getBalance(
        @GetUser('email') email: string,
        @Param('currency') currency: Currency) {
        const account = await this.accountService.getUserAccountId(email)
        if (account.currency === currency) {
            return {
                currency: currency,
                balance: account.balance
            }
        }
    }

    @Get('transactions')
    async getTransactions(){

    }

    @Get('deposit')
    async getPossibleAmountForDeposit(){

    }
}