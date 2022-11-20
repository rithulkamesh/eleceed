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
        this.loadEvents();
        return this;
    }

    public async verify(id?: number) {
        const channel: TextChannel = this.channels.cache.get("1043848355433951273") as TextChannel;
        if (!channel) return;
        // send a message to channel
        const message = await channel.send("Verifying...");

    }

    public async loadCommands() {
        const slashCommands = readdirSync(path.join(__dirname, "..", "commands")).filter((file) => file.endsWith(".ts"));
        for (const file of slashCommands) {
            const { command } = await import(path.join(__dirname, "..", "commands", `${file}`));
            this.commands.set(command.data.name, command);
            Logger.info(`Loaded slash command ${command.data.name}`);
        }
    }

    public async loadEvents() {
        const events = readdirSync(path.join(__dirname, "events")).filter((file) => file.endsWith(".ts"));
        for (const file of events) {
            let Event = await import(path.join(__dirname, "events", `${file}`));
            Event = new Event.default();
            if (Event.once) {
                this.once(Event.event, async (...args) => await Event.run(this, ...args));
            } else {
                this.on(Event.event, async (...args) => await Event.run(this, ...args));
            }
        }
    }
}