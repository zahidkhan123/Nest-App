import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { usersEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../experience/experience.entity";

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name)
    constructor(
        @InjectRepository(usersEntity)
        private readonly userRespositry: Repository<usersEntity>) {
    }

    private getUsersBaseQuery = () => {
        return this.userRespositry.createQueryBuilder('u').addOrderBy("u.id", 'DESC')

    }

    private getUsersWithExperience = () => {
        const query = this.getUsersBaseQuery().loadRelationCountAndMap('u.experienceCount', 'u.experiences')
            .loadRelationCountAndMap('u.careerMentor', "u.experiences", "experience", (qb) => qb.where('experience.role = :role', { role: Role.CareeerMentor }))

        return query
    }

    public getUser = async (id: number): Promise<usersEntity> => {
        const user = this.getUsersWithExperience().andWhere('u.id = :id', { id })
        return await user.getOne()
    }



}