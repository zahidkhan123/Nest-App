
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Experience } from '../experience/experience.entity'
import { UsersContactDetailsEntity } from '../user_contacts_details/user_contact_detail_entity'
import { EventEntity } from "../event/event.entity";
import { Expose } from "class-transformer";

@Entity('users')
export class usersEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number

    @Column({ unique: true })
    @Expose()
    name: string

    @Column()
    @Expose()
    age: number

    @Column({ unique: true })
    @Expose()
    email: string


    @Column()
    @Expose()
    gender: string

    @Column()
    password: string

    @OneToMany(() => Experience, (experience) => experience.user)
    experiences: Experience[];

    @OneToMany(() => UsersContactDetailsEntity, (user_contact_details) => user_contact_details.user)
    user_contact_details: UsersContactDetailsEntity[];


    @OneToMany(() => EventEntity, (events) => events.organizar)
    organized: EventEntity[];


    experienceCount?: number

    careerMentor?: number;
    customer?: number;
    admin?: number
}

