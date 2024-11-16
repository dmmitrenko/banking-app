import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { Repository } from "./repository";

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository extends Repository<User, number> implements IUserRepository  {
    protected model: any;

    constructor(readonly prisma: PrismaService){
        super(prisma);
        this.model = prisma.user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } })
        return user
    }
}