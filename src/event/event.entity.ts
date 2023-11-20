import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}