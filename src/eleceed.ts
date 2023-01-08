import { ActivityType, Client, GatewayIntentBits, TextChannel, Collection, Guild } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import Logger from "utils/logger";
import { PrismaClient } from '@prisma/client'

export class Eleceed extends Client {
    public commands = new Collection();
    public aliases = new Collection();
    public ready = false;
    public db = new PrismaClient();
    public guild: Guild | undefined = undefined;

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
        this.user?.setPresence({ activities: [{ name: "myself start up...", type: ActivityType.Watching }] });
        await this.login(token);
        this.guild = this.guilds.cache.get("1041770531193638974")
        this.user?.setStatus("dnd");
        Logger.success("Bot started successfully.");

        ["events", "commands"].forEach(async (h) => {
            const handler = await import(`./handlers/${h}`);
            handler.default(this);
        });
        return this;
    }

    public async verify(id: string) {
        const member = await this.guild?.members.fetch(id);
        member?.roles.add("1042058669304594432")
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
