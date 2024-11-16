import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common"
import Decimal from "decimal.js"
import { AccountService } from "src/application/account/account.service"
import { JwtAuthGuard } from "src/application/auth/guards/auth.guard"
import { GetUser } from "src/shared/decorators/roles.decorator"

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController{
    constructor(private readonly accountService: AccountService){ }

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
}