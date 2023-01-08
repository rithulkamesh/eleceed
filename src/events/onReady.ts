import { Eleceed } from "eleceed";
import { ActivityType, Client, Events, VoiceChannel } from "discord.js";
import axios from "axios";

async function update_twitter_count(client: Client) {
    const res = await axios.get("https://api.twitter.com/2/users/1340369653986512896?user.fields=public_metrics", {
        headers: {
            "Authorization": "Bearer " + process.env.TWITTER_BEARER_TOKEN
        }
    });
    const chnl = client.channels.cache.get("1042079883909677106") as VoiceChannel;
    if (!chnl) return;
    await chnl.setName(`Twitter: ${res.data.data.public_metrics.followers_count}`);
}

export default class ReadyEvent {
    public event = Events.ClientReady;

    public async run(client: Eleceed) {
        const membercount = client.guilds.cache.get("1041770531193638974")?.memberCount;
        await client.user?.setPresence({ activities: [{ name: `${membercount} members | https://rithul.dev/discord`, type: ActivityType.Watching }] });
        await client.user?.setStatus("online");
        const memCountChannel = client.channels.cache.get("1042079879480475758") as VoiceChannel;
        if (!memCountChannel) return;
        await memCountChannel.setName(`Humans: ${membercount && membercount - 1}`);
        if (process.env.ENVIRONMENT == "prod") {
            await update_twitter_count(client)
            setInterval(async () => {
                await update_twitter_count(client);
            }, 600000);
        }
    }
};


