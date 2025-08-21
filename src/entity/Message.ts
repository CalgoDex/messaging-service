import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConvoType } from '../types/types';
import { Conversation } from './Conversation';

@Entity()
export class Message {
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

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
