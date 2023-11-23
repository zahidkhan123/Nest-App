
import { usersEntity } from "../auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_contact_details')
export class UsersContactDetailsEntity {
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


    @ManyToOne(() => usersEntity, (user) => user.user_contact_details)
    @JoinColumn({
        name: "user_id"
    })
    user: usersEntity

}