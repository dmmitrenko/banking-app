import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { Repository } from './repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository
  extends Repository<User, number>
  implements IUserRepository
{
  protected modelName = 'user';

  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async blockUser(user: User): Promise<void> {

    return this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { isBlocked: true }
      });

      await prisma.account.updateMany({
        where: { userId: user.id },
        data: {isActive: false}
      })
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
}