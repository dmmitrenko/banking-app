import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { AdminService } from "src/application/admin/admin.service";
import { CreateDepositOfferDto } from "src/application/deposit/dto/create-deposit-offer.dto";
import { JwtAuthGuard } from "src/application/auth/guards/auth.guard";
import { RolesGuard } from "src/application/auth/guards/role.guard";
import { User } from "src/domain/models/user.model";
import { Roles } from "src/shared/decorators/roles.decorator";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){ }

    @Get('/:email')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserInformation(@Param('email') email: string) : Promise<User> {
        const user = await this.adminService.getUserInformation(email)
        return user
    }

    @Post('deposit')
    @UsePipes(new ValidationPipe())
    async createDepositOffer(@Body() dto: CreateDepositOfferDto){
    }

    @Post('/:email')
    async blockUser(@Param('email') email: string){
        await this.adminService.blockUser(email)
        return {
            message: 'user successfully blocked'
        }
    }

    async getUserTransaction(){

    }
}