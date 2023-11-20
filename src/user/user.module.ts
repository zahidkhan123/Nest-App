import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { usersEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([usersEntity])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
