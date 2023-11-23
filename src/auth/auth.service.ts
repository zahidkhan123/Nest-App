import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { usersEntity } from "./user.entity";
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly jwtService: JwtService
    ) { }

    public getTokenForUser = (user: usersEntity, expiration?: string): string => {

        const payload = { name: user?.name, sub: user?.id }
        return this.jwtService.sign(payload, expiration && { expiresIn: '7d' })

    }

    public generatePassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10)
    }
}