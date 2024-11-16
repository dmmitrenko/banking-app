import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Currency } from '@prisma/client';
import Decimal from 'decimal.js';
import { AccountService } from 'src/application/account/account.service';
import { OpenAccountDto } from 'src/application/account/dto/open-account-dto';
import { JwtAuthGuard } from 'src/application/auth/guards/auth.guard';
import { RolesGuard } from 'src/application/auth/guards/role.guard';
import { DepositService } from 'src/application/deposit/deposite.service';
import { OpenDepositDto } from 'src/application/deposit/dto/open-deposit-dto';
import { GetUser, Roles } from 'src/shared/decorators/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly accountService: AccountService,
    private readonly depositService: DepositService
  ) {}

  @Post('/tranfer/:email')
  async transferMoney(
    @Param('email') recipientEmail: string,
    @Body() body: { amount: number },
    @GetUser('email') senderEmail: string
  ) {
    const { amount } = body;

    const transaction = await this.accountService.transferMoney(
      senderEmail,
      recipientEmail,
      new Decimal(amount)
    );
    return {
      message: `Successfully transferred ${amount} from ${senderEmail} to ${recipientEmail}`,
      transaction
    };
  }

  @Post('/deposit-money/:amount')
  async depositMoney(
    @Param('amount') amount: string,
    @GetUser('email') email: string
  ) {
    const decimalAmount = new Decimal(amount);

    const account = await this.accountService.getUserAccount(email);
    await this.accountService.depositMoney(decimalAmount, account.id);

    return {
      message: 'Successfully funded'
    };
  }

  @Post('open-account')
  async openAccount(
    @Body() dto: OpenAccountDto,
    @GetUser('email') email: string
  ) {
    await this.accountService.openAccount(email, dto.currency);

    return {
      message: 'Account is opened'
    };
  }

  @Post('close-account')
  async closeAccount(@GetUser('email') email: string) {
    const account = await this.accountService.getUserAccount(email);
    await this.accountService.closeAccount(account.id);

    return {
      message: 'Account closed'
    };
  }

  @Post('withdraw-money/:amount')
  async withdrawMoney(
    @GetUser('email') email: string,
    @Param('amount') amount: Decimal
  ) {
    const account = await this.accountService.getUserAccount(email);
    await this.accountService.withdrawMoney(amount, account.id);
  }

  @Get('balance/:currency')
  async getBalance(
    @GetUser('email') email: string,
    @Param('currency') currency: Currency
  ) {
    const account = await this.accountService.getUserAccount(email);
    const amount = await this.accountService.getAccountBalance(
      account,
      currency
    );
    return {
      currency: currency,
      balance: amount
    };
  }
}
