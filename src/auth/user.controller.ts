/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BadRequestException, Body, Controller, Get, Injectable, Param, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { usersEntity } from "./user.entity";
import { get } from "http";
import { createUserDTO } from "./input/create-user.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Controller('/user')
export class UserController {
    constructor(
        @InjectRepository(usersEntity)
        private readonly repository: Repository<usersEntity>,
        private readonly UserService: UserService,
        private readonly AuthService: AuthService
    ) { }

    @Get('')
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
        const users = await this.UserService.getUsersWithPaginateed({ total: false, currentPage: page, limit: +limit });
        return users
    }
    @Get('/:id')
    async findOne(@Param("id") id) {
        console.log(id)
        return await this.UserService.getUser(id);
    }
    @Post('/create')
    async create(@Body() createUserDto: createUserDTO) {
        const user = new usersEntity()
        if (createUserDto.password !== createUserDto.retypePassword) {
            throw new BadRequestException(['passswords are not matched'])
        }

        const existingUser = await this.repository.findOne({
            where: [
                { name: createUserDto.name },
                { email: createUserDto.email },
            ],
        });

        if (existingUser) {
            throw new BadRequestException(['user already exist with this email or name'])
        }

        user.name = createUserDto.name;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.gender = createUserDto.gender;
        user.password = await this.AuthService.generatePassword(createUserDto.password)
        return {
            ...(await this.repository.save(user)),
            token: this.AuthService.getTokenForUser(user)
        }
    }
}