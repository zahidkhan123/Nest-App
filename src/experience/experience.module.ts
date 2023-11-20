import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';

@Module({ imports: [TypeOrmModule.forFeature([Experience])], })
export class ExperienceModule { }
