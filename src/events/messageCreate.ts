import { Eleceed } from "eleceed";
import { Events, Message } from "discord.js";

export default class MessageCreateEvent {
    public event = Events.MessageCreate;

    public async run(client: Eleceed, message: Message) {
        if (message.author.bot) return;
        // If user not in database, create them
        const user = await client.db.member.findUnique({
            where: {
                id: message.author.id,
            }
        });
        if (!user) {
            await client.db.member.create({
                data: {
                    id: message.author.id,
                }
            });
        }
    }
};


