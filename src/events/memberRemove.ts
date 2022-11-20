import { Eleceed } from "eleceed";
import { Events, GuildMember, VoiceChannel } from "discord.js";

export default class GuildMemberRemove {
    public event = Events.GuildMemberRemove;

    public async run(client: Eleceed, member: GuildMember) {
        const memCountChannel = client.channels.cache.get("1042079879480475758") as VoiceChannel;
        if (!memCountChannel) return;
        await memCountChannel.setName(`Humans: ${member.guild.memberCount - 1}`);

    }
};


