
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { usersEntity } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor(
        @InjectRepository(usersEntity)
        private readonly UserRepositry: Repository<usersEntity>

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_SECRET
        })
    }

    async validate(payload: any) {

        return await this.UserRepositry.findOne({ where: { id: payload.sub } })
    }


}