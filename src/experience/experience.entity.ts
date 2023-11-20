import { usersEntity } from "../user/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


export enum Role {
    CareeerMentor = 1,
    Customer = 2,
    Admin = 3
}
@Entity('experience')
export class Experience {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    company_address: string
    @Column()
    company_contact_no: number
    @Column()
    salary: number
    @Column()
    country_code: number

    @ManyToOne(() => usersEntity, (user) => user.experiences, {
        nullable: false,
    })
    @JoinColumn({
        name: "user_id"
    })
    user: usersEntity

    @Column("enum", {
        enum: Role,
        default: Role.CareeerMentor
    })
    role: Role
}