import { Eleceed } from "eleceed";
import { Events, GuildMember, VoiceChannel } from "discord.js";

export default class GuildMemberAdd {
    public event = Events.GuildMemberAdd;

    public async run(client: Eleceed, member: GuildMember) {
        client.db.user.create({
            data: {
                id: parseInt(member.id),
            }
        });

        const memCountChannel = client.channels.cache.get("1042079879480475758") as VoiceChannel;
        if (!memCountChannel) return;
        await memCountChannel.setName(`Humans: ${member.guild.memberCount - 1}`);

    }
};


