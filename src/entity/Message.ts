import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ConvoType } from "../types/types"

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    to: string

    @Column()
    from: string

    @Column()
    body: string

    @Column()
    type: ConvoType

    @Column()
    conversation_id: number

    @Column()
    timestamp: Date

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}
