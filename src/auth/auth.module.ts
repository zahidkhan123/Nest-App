import { Module } from "@nestjs/common";
import { usersEntity } from "./user.entity";
import { LocalStrategy } from "./local.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "../user/user.service";
import { UserController } from "./user.controller";
import { RefreshStrategy } from "./refresh.strategy";


@Module({
    imports: [TypeOrmModule.forFeature([usersEntity]),
    JwtModule.registerAsync({
        useFactory: () => ({ secret: process.env.AUTH_SECRET, signOptions: { expiresIn: '0s' } })

    })
    ],
    controllers: [AuthController, UserController],
    providers: [LocalStrategy, AuthService, JwtStrategy, UserService, RefreshStrategy]
})

export class AuthModule {

}