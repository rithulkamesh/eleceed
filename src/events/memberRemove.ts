import { Eleceed } from "eleceed";
import { EmbedBuilder, Events, GuildMember, TextChannel, VoiceChannel } from "discord.js";

export default class GuildMemberRemove {
    public event = Events.GuildMemberRemove;

    public async run(client: Eleceed, member: GuildMember) {
        const memCountChannel = client.channels.cache.get("1042079879480475758") as VoiceChannel;
        if (!memCountChannel) return;
        await memCountChannel.setName(`Humans: ${member.guild.memberCount - 1}`);
        const leaveChannel = client.channels.cache.get("1044282612610506802") as TextChannel;

        const embed = new EmbedBuilder()
            .setDescription(`<:leave:1044283868020232202> **${member.user.tag}** has left the party. There are now ${member.guild.memberCount - 1} members in the server!`)
            .setColor("#ff0000");
        leaveChannel.send({ embeds: [embed] });

    }
};


