import { Body, Controller, HttpCode, Post, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterUserDto } from "../dto/register-user-dto";
import { AuthService } from "src/application/auth/auth.service";
import { UserAlreadyExistsFilter } from "../filters/user-already-exists.filter";
import { LoginUserDto } from "../dto/login-user-dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UseFilters(UserAlreadyExistsFilter)
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    async register(@Body() dto: RegisterUserDto){
        await this.authService.register(dto)
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginUserDto){

    }
}