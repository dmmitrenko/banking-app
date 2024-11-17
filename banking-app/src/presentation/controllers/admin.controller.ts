import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { AdminService } from "src/application/admin/admin.service";
import { JwtAuthGuard } from "src/application/auth/guards/auth.guard";
import { RolesGuard } from "src/application/auth/guards/role.guard";
import { User } from "src/domain/models/user.model";
import { Roles } from "src/shared/decorators/roles.decorator";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){ }

    @Get('/:email')
    @ApiOperation({ summary: 'get user information'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async getUserInformation(@Param('email') email: string) : Promise<User> {
        const user = await this.adminService.getUserInformation(email)
        return user
    }

    @Post('/:email')
    @ApiOperation({ summary: 'block the user'})
    async blockUser(@Param('email') email: string){
        await this.adminService.blockUser(email)
        return {
            message: 'user successfully blocked'
        }
    }
}