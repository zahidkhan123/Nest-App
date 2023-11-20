import { registerAs } from "@nestjs/config";
import { Experience } from "./../experience/experience.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EventEntity } from "../event/event.entity";
import { usersEntity } from "../user/user.entity";
import { UsersContactDetailsEntity } from "../user_contacts_details/user_contact_detail_entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectTimeout: 10000,
    database: process.env.DB_DATABASE,
    entities: [EventEntity, usersEntity, Experience, UsersContactDetailsEntity],
    synchronize: false,
}))