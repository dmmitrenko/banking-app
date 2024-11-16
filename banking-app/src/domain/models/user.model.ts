import { UserRole } from "@prisma/client";

export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public createdAt: Date;
    public role: UserRole;
    public isBlocked: boolean;
  
    constructor(user: {
      id?: number;
      name: string;
      email: string;
      password: string;
      createdAt?: Date;
      role: UserRole;
      isBlocked?: boolean;
    }) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.createdAt = user.createdAt;
      this.role = user.role;
      this.isBlocked = user.isBlocked;
    }
}
