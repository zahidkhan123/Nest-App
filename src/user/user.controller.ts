/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Injectable, Param, Post, Query } from "@nestjs/common";
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
    async create(@Body() input: createUserDTO) {
        return await this.respositry.save({
            ...input,
        })
    }
}