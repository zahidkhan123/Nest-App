import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { usersEntity } from "../user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(usersEntity)
        private readonly UserRepositry: Repository<usersEntity>

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_SECRET
        })
    }

    async validate(payload: any) {
        console.log("🚀 ~ file: jwt.strategy.ts:24 ~ JwtStrategy ~ validate ~ payload:", payload)
        return await this.UserRepositry.findOne({ where: { id: payload.sub } })
    }
}