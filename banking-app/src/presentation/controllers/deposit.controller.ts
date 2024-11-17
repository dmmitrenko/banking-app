import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import Decimal from 'decimal.js';
import { AccountService } from 'src/application/account/account.service';
import { JwtAuthGuard } from 'src/application/auth/guards/auth.guard';
import { RolesGuard } from 'src/application/auth/guards/role.guard';
import { DepositService } from 'src/application/deposit/deposite.service';
import { CreateDepositOfferDto } from 'src/application/deposit/dto/create-deposit-offer.dto';
import { OpenDepositDto } from 'src/application/deposit/dto/open-deposit-dto';
import { GetUser, Roles } from 'src/shared/decorators/roles.decorator';

@Controller('deposit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepositController {
  constructor(
    private readonly accountService: AccountService,
    private readonly depositService: DepositService
  ) {}

  @Get('all')
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'get all deposits'})
  async getAllDeposits() {
    return await this.depositService.getAllDeposits();
  }

  @Get('active')
  @ApiOperation({ summary: 'receive all active deposits'})
  async getActiveDeposits() {
    return await this.depositService.getActiveDeposits();
  }

  @Post('open')
  @ApiOperation({ summary: 'open a deposit for an account'})
  @UsePipes(new ValidationPipe())
  async openDeposit(@Body() dto: OpenDepositDto, @GetUser('email') email: string) {
    const decimalAmount = new Decimal(dto.startAmount);
    const account = await this.accountService.getUserAccount(email);
    await this.depositService.openDeposit(account, decimalAmount, dto.depositTitle);
    return {
      message: 'successful deposit'
    };
  }

  @Get('possible-amount/:depositTitle/:amount')
  @ApiOperation({ summary: 'receive the possible amount at the end of the deposit'})
  @UsePipes(new ValidationPipe())
  async getPossibleDepositAmount(
    @Param('depositTitle') title: string,
    @Param('amount') amount: string
  ) {
    const decimalAmount = new Decimal(amount);
    return await this.depositService.getPosibleDepositAmount(
      decimalAmount,
      title
    );
  }

  @Post('set-user-interest/:accountDepositId/:newInterest')
  @ApiOperation({ summary: 'set a specific deposit percentage for a specific account'})
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async setPersonalDepositIneterst(
    @Param('accountDepositId', ParseIntPipe) accountDepositId: number,
  @Param('newInterest', ParseIntPipe) interest: number,
  ) {
    await this.depositService.changeDepositPercentage(
      accountDepositId,
      interest
    );
  }

  @Get(':email')
  @ApiOperation({ summary: 'retrieve the user\'s deposit history'})
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async getUserDeposits(@Param('email') email: string) {
    const account = await this.accountService.getUserAccount(email);
    return await this.depositService.getUserDepositsHistory(account.id)
  }

  @Get()
  @ApiOperation({ summary: 'retrieve my deposit history'})
  @UsePipes(new ValidationPipe())
  async getDeposits(@GetUser('email') email: string) {
    const account = await this.accountService.getUserAccount(email);
    return await this.depositService.getUserDepositsHistory(account.id)
  }

  @Post()
  @ApiOperation({ summary: 'create a new deposit'})
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async createDepositOffer(@Body() dto: CreateDepositOfferDto){
    await this.depositService.createDeposit(dto)
    return {
        message: 'deposit created'
    }
  }
}
