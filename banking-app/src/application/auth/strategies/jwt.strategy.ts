import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role, User } from "src/domain/models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: Pick<User, 'email' | 'roleId'>){
        const {email, roleId} = payload
        const isAdmin = roleId === Role.Admin
        
        return { email, roleId, isAdmin }
    }
}