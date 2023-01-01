import { User } from 'src/app/Model/User';
export class Message {
    id: number | undefined;
    message: string | undefined;
    dataOfCreation: Date | undefined;
    messageAuthor: User | undefined;
    receiver: User | undefined;
    messages: Array<Message | undefined> | undefined;
}