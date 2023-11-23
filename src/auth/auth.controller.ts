import { ClassSerializerInterceptor, Controller, Get, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { usersEntity } from "./user.entity";
import { CurrentUser } from "./current-user.decorator";

@Controller('auth')
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/login')
    @UseGuards(AuthGuard('mystrategy'))
    async login(@CurrentUser() user: usersEntity) {

        return {
            userId: user?.id,
            accessToken: this.authService.getTokenForUser(user),
            refreshToken: this.authService.getTokenForUser(user, "expiresIn")
        }
    }

    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: usersEntity) {
        return user

    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    async refreshToken(@CurrentUser() user: usersEntity) {
        return {
            accessToken: this.authService.getTokenForUser(user),
        }
    }
}

