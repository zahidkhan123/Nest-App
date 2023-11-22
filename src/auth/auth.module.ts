import { Module } from "@nestjs/common";
import { usersEntity } from "../user/user.entity";
import { LocalStrategy } from "./local.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [TypeOrmModule.forFeature([usersEntity]),
    JwtModule.registerAsync({
        useFactory: () => ({ secret: process.env.AUTH_SECRET, signOptions: { expiresIn: '60m' } })

    })
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, AuthService, JwtStrategy]
})

export class AuthModule {

}