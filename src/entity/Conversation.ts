import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ConvoType } from "../types/types"

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  type: ConvoType;

  @Column({
    type: 'text',
    array: true,
    name: 'message_ids',
    nullable: true,
    default: () => "'{}'",
  })
  message_ids: string[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}