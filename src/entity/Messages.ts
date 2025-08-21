import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConvoType } from '../types/types';
import { Conversations } from './Conversations';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  body: string;

  @Column()
  type: ConvoType;

  @Column()
  conversation_id: string;

  @Column()
  timestamp: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Conversations, (conversation) => conversation.id)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversations;
}
