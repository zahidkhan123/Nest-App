import { usersEntity } from "../auth/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    description: string
    @Column()
    when: Date
    @Column()
    address: string
    @Column()
    name: string


    @ManyToOne(() => usersEntity, (user) => user.organized)
    @JoinColumn({
        name: "organizer_id"
    })
    organizar: usersEntity

}