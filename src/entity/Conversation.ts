import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ConvoType } from "../types/types"

@Entity()
export class Conversation {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    to: string
    
    @Column()
    from: string

    @Column()
    type: ConvoType

    @Column({ type: "uuid", array: true, name: "participant_ids", nullable: false, default: () => "'{}'" })
    participant_ids: string[]

    @Column({ type: "uuid", array: true, name: "message_ids", nullable: false, default: () => "'{}'" })
    message_ids: string[]

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}