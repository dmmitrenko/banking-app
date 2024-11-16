import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import Decimal from 'decimal.js';
import { AccountService } from 'src/application/account/account.service';
import { JwtAuthGuard } from 'src/application/auth/guards/auth.guard';
import { RolesGuard } from 'src/application/auth/guards/role.guard';
import { DepositService } from 'src/application/deposit/deposite.service';
import { OpenDepositDto } from 'src/application/deposit/dto/open-deposit-dto';
import { GetUser, Roles } from 'src/shared/decorators/roles.decorator';

@Controller('deposit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly accountService: AccountService,
    private readonly depositService: DepositService
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getAllDeposits() {
    return await this.depositService.getAllDeposits();
  }

  @Get('active')
  async getActiveDeposits() {
    return await this.depositService.getActiveDeposits();
  }

  @Post('open')
  async openDeposit(@Body() dto: OpenDepositDto) {
    await this.depositService.openDeposit(dto);
    return {
      message: 'successful deposit'
    };
  }

  @Get('possible-amount/:depositTitle/:amount')
  async getPossibleDepositAmount(
    @Param('depositTitle') title: string,
    @Param('amount') amount: string,
    @GetUser('email') email: string
  ) {
    const decimalAmount = new Decimal(amount);
    const account = await this.accountService.getUserAccount(email);
    return await this.depositService.getPosibleDepositAmount(
      account,
      decimalAmount,
      title
    );
  }

  @Post('set-user-interest/:accountDepositId/:newInterest')
  @Roles(UserRole.ADMIN)
  async setPersonalDepositIneterst(
    @Param('accountDepositId') accountDepositId: number,
    @Param('newInterest') interest: number
  ) {
    await this.depositService.changeDepositPercentage(
      accountDepositId,
      interest
    );
  }
}
