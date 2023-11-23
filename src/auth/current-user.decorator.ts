import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest()
    const user = request.user ?? null
    return user
})