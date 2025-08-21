import "reflect-metadata"
import { DataSource } from "typeorm"
import { Message } from "./entity/Message"
import { Conversation } from "./entity/Conversation"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "messaging_user",
    password: "messaging_password",
    database: "messaging_service",
    synchronize: true,
    logging: false,
    entities: [Message, Conversation],
    migrations: [],
    subscribers: [],
})
