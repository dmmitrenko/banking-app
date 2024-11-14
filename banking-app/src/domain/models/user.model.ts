export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public createdAt: Date;
    public roleId: number;
  
    constructor(user: {
      id?: number;
      name: string;
      email: string;
      password: string;
      createdAt?: Date;
      roleId: number;
    }) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.createdAt = user.createdAt;
      this.roleId = user.roleId;
    }

    private mapRoleIdToEnum(roleId: number): Role {
        return Role[roleId as unknown as keyof typeof Role];
      }
}

export enum Role {
  User,
  Admin
}
