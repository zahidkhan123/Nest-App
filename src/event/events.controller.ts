/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    ValidationPipe,
    Logger
} from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";
import { EventEntity } from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, LessThanOrEqual, Like, MoreThan, Repository } from "typeorm";
import { EventService } from "./events.service";

@Controller("/events")
export class EventsController {
    private readonly logger = new Logger(EventsController.name)
    constructor(
        @InjectRepository(EventEntity)
        private readonly respositry: Repository<EventEntity>,
        private readonly EventService: EventService
    ) { }

    // @Get()
    // async findAll() {

    //     return await this.respositry.find();
    // }

    // @Get('/practice')
    // async practice() {
    //     this.logger.log("before query")
    //     const events = await this.respositry.find({ where: { id: LessThanOrEqual(7), description: Like("%Let's%") }, take: 5 });
    //     console.log("🚀 ~ file: events.controller.ts:39 ~ EventsController ~ practice ~ events:", events)
    //     const test = { ...events }
    //     this.logger.debug(`found ${test} events`)
    //     return events
    // }

    @Get(":id")
    async findOne(@Param("id") id) {
        return await this.EventService.getEvent(id);
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.respositry.save({
            ...input,
            when: new Date(input.when)
        })

    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.respositry.findOne(id)
        return await this.respositry.save({
            ...event,
            ...input,
            when: input.when ?
                new Date(input.when) : event.when
        })


    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.respositry.findOne(id)
        return await this.respositry.remove(id)

    }
}
