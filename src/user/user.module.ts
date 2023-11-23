import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersEntity } from '../auth/user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([usersEntity])],
    controllers: [],
    providers: [UserService]
})
export class UserModule { }
