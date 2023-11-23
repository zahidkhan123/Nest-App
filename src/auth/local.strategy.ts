import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { usersEntity } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "mystrategy") {
    private readonly logger = new Logger(LocalStrategy.name)
    constructor(
        @InjectRepository(usersEntity)
        private readonly UserRepositry: Repository<usersEntity>
    ) {
        super()
    }
    public validate = async (username: string, password: string): Promise<any> => {
        const user = await this.UserRepositry.findOne({ where: { name: username } })

        if (!user) {

            throw new UnauthorizedException()
        }

        if (!(await bcrypt.compare(password, user.password))) {
            this.logger.debug(`Invalid creds`)
            throw new UnauthorizedException()
        }

        return user
    }




}