import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventEntity } from './event.entity';
import { EventService } from './events.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventsController],
    providers: [EventService]

})
export class EventModule {
}
