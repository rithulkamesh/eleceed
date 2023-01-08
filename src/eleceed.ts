import { ActivityType, Client, GatewayIntentBits, TextChannel, Collection } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import Logger from "utils/logger";
import { PrismaClient } from '@prisma/client'

export class Eleceed extends Client {
    public commands = new Collection();
    public aliases = new Collection();
    public ready = false;
    public db = new PrismaClient();

    constructor() {
        const clientOptions = {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates]
        }
        super(clientOptions);
    }

    public async start() {
        const token = process.env.BOT_TOKEN;
        if (!token) {
            Logger.error("No token provided.");
            process.exit(1);
        };
        await this.user?.setPresence({ activities: [{ name: "myself start up...", type: ActivityType.Watching }] });
        await this.login(token);
        await this.user?.setStatus("dnd");
        Logger.success("Bot started successfully.");

        ["events", "commands"].forEach(async (h) => {
            const handler = await import(`./handlers/${h}`);
            handler.default(this);
        });
        return this;
    }

    public async verify(id?: number) {
        const channel: TextChannel = this.channels.cache.get("1043848355433951273") as TextChannel;
        if (!channel) return;
        // send a message to channel
        const message = await channel.send("Verifying...");

    }

    public async loadCommands() {
        const commands = readdirSync(path.join(__dirname, "commands"));
        for (const category of commands) {
            const commandFiles = readdirSync(path.join(__dirname, "commands", category)).filter((file) => file.endsWith(".ts"));
            for (const file of commandFiles) {
                let Command = await import(path.join(__dirname, "commands", category, `${file}`));
                Command = new Command.default();
                this.commands.set(Command.name, Command);
                Command.aliases.forEach((alias: string) => {
                    this.aliases.set(alias, Command.name);
                });
            }
        }
    }
}
