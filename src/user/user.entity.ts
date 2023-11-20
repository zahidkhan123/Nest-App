
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Experience } from '../experience/experience.entity'
import { UsersContactDetailsEntity } from '../user_contacts_details/user_contact_detail_entity'



@Entity('users')
export class usersEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    age: number
    @Column()
    email: string
    @Column()
    gender: string

    @OneToMany(() => Experience, (experience) => experience.user)
    experiences: Experience[];

    @OneToMany(() => UsersContactDetailsEntity, (user_contact_details) => user_contact_details.user)
    user_contact_details: UsersContactDetailsEntity[];

    experienceCount?: number

    careerMentor?: number;
    customer?: number;
    admin?: number
}

