import { Controller, Get, Param, Query } from "@nestjs/common";
import { AdminService } from "src/application/admin/admin.service";
import { User } from "src/domain/models/user.model";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){ }

    @Get('/:email')
    async getUserInformation(@Param('email') email) : Promise<User> {
        const user = this.adminService.getUserInformation(email)
        return user
    }
    
}