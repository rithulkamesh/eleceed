import { Eleceed } from "eleceed";
import { ActivityType, Events } from "discord.js";

export default class ReadyEvent {
    public event = Events.ClientReady;

    public async run(client: Eleceed) {
        await client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.get("1041770531193638974")?.memberCount} members | https://rithul.dev/discord`, type: ActivityType.Watching }] });
        await client.user?.setStatus("online");
    }
};


