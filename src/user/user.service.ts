import { Injectable, Logger } from "@nestjs/common";
import { PaginateOptions, paginate } from "./../pagination/paginator";
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
        const query = this.getUsersBaseQuery()
            .loadRelationCountAndMap('u.experienceCount', 'u.experiences')
            .loadRelationCountAndMap(
                'u.careerMentor',
                'u.experiences',
                'experience',
                (qb) => qb.andWhere('experience.role = :role', { role: Role.CareeerMentor })
            )
            .loadRelationCountAndMap(
                'u.customer',
                'u.experiences',
                'experience',
                (qb) => qb.andWhere('experience.role = :role', { role: Role.Customer })
            )
            .loadRelationCountAndMap(
                'u.admin',
                'u.experiences',
                'experience',
                (qb) => qb.andWhere('experience.role = :role', { role: Role.Admin })
            );

        return query;
    };



    public getUser = async (id: number): Promise<usersEntity> => {
        const user = this.getUsersWithExperience().andWhere('u.id = :id', { id })
        return await user.getOne()
    }

    public getUsersWithPaginateed = async (paginateOptions: PaginateOptions) => {
        return await paginate(await this.getUsersWithExperience(), paginateOptions)
    }



}