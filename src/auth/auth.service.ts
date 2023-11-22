import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { usersEntity } from "../user/user.entity";


@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly jwtService: JwtService
    ) { }

    public getTokenForUser = (user: usersEntity): string => {

        return this.jwtService.sign({ name: user.name, sub: user.id })

    }
}