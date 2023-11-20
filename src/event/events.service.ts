
import { EventEntity } from "./event.entity";
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name)
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventsRespositry: Repository<EventEntity>) { }


    private getEventsBaseQuery = () => {
        return this.eventsRespositry.createQueryBuilder('e').orderBy('e.id', 'DESC')
    }

    public getEvent = async (id: number): Promise<EventEntity | undefined> => {
        const query = this.getEventsBaseQuery().andWhere('e.id = :id', { id })
        this.logger.debug(query.getSql())

        return await query.getOne()
    }
}