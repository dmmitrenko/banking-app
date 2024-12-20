import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import Decimal from 'decimal.js';
import { AccountService } from 'src/application/account/account.service';
import { OpenAccountDto } from 'src/application/account/dto/open-account-dto';
import { JwtAuthGuard } from 'src/application/auth/guards/auth.guard';
import { RolesGuard } from 'src/application/auth/guards/role.guard';
import { GetUser } from 'src/shared/decorators/roles.decorator';

@Controller('account')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @Post('/tranfer/:email')
  @ApiOperation({ summary: 'transfer money from your account to another user\'s account'})
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
  @ApiOperation({ summary: 'fund your account'})
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

  @Post('open')
  @ApiOperation({ summary: 'open an account'})
  async openAccount(
    @Body() dto: OpenAccountDto,
    @GetUser('email') email: string
  ) {
    await this.accountService.openAccount(email, dto.currency);

    return {
      message: 'Account is opened'
    };
  }

  @Post('close')
  @ApiOperation({ summary: 'close an account'})
  async closeAccount(@GetUser('email') email: string) {
    const account = await this.accountService.getUserAccount(email);
    await this.accountService.closeAccount(account.id);

    return {
      message: 'Account closed'
    };
  }

  @Post('withdraw-money/:amount')
  @ApiOperation({ summary: 'withdrawal'})
  async withdrawMoney(
    @GetUser('email') email: string,
    @Param('amount') amount: Decimal
  ) {
    const account = await this.accountService.getUserAccount(email);
    await this.accountService.withdrawMoney(amount, account.id);
  }

  @Get('balance/:currency')
  @ApiOperation({ summary: 'get the account balance in a specific currency'})
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
