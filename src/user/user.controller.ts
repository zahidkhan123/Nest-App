/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Injectable, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { usersEntity } from "./user.entity";
import { get } from "http";
import { createUserDTO } from "./create-user.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
    constructor(
        @InjectRepository(usersEntity)
        private readonly respositry: Repository<usersEntity>,
        private readonly UserService: UserService
    ) { }

    @Get('')
    async findAll() {
        return await this.respositry.find();
    }
    @Get('/:id')
    async findOne(@Param("id") id) {
        console.log(id)
        return await this.UserService.getUser(id);
    }
    @Post('/create')
    async create(@Body() input: createUserDTO) {
        return await this.respositry.save({
            ...input,
        })
    }
}