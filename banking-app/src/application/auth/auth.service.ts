import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { RegisterUserDto } from 'src/presentation/dto/register-user-dto';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import * as bcrypt from 'bcrypt';
import { Role, User } from 'src/domain/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) 
    private readonly userReposity: IUserRepository
  ) {}

  public async register(dto: RegisterUserDto) {
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
}
