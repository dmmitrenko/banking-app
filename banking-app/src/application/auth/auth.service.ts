import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { RegisterUserDto } from 'src/presentation/dto/register-user-dto';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/models/user.model';
import { compare } from 'bcryptjs';
import { WRONG_PASSWORD_ERROR } from 'src/shared/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) 
    private readonly userReposity: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterUserDto) {
    const isUserExists = await this.userReposity.findByEmail(dto.email);
    if (isUserExists) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = new User(
      {
        name: dto.name,
        password: hashedPassword,
        roleId: 1,
        email: dto.email
      }
    );

    await this.userReposity.create(user);
  }

  async validateUser(email: string, password: string): Promise<Pick<User, 'email' | 'roleId'>> {
    const user = await this.userReposity.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
    }

    const isCorrectPassword = await compare(password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
    }

    return {
      email: user.email,
      roleId: user.roleId
    }
  }

  async login(email: string, roleId: number) {
    const payload = { email, roleId }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
