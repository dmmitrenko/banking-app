import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { RegisterUserDto } from '../../application/auth/dto/register-user-dto';
import { AuthService } from 'src/application/auth/auth.service';
import { UserAlreadyExistsFilter } from '../filters/user-already-exists.filter';
import { LoginUserDto } from '../../application/auth/dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseFilters(UserAlreadyExistsFilter)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async register(@Body() dto: RegisterUserDto) {
    await this.authService.register(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() { login, password }: LoginUserDto) {
    const {email, roleId} = await this.authService.validateUser(login, password);
    return await this.authService.login(email, roleId)
  }
}
