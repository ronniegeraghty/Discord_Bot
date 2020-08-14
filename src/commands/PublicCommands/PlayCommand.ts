import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import ytdl from "ytdl-core";

export default class PlayCommand extends Command {
  public constructor() {
    super("play", {
      aliases: ["play"],
      category: "Public Commands",
      description: {
        content: "Play music from youtube",
        useage: "play [ youtube link ]",
        examples: [
          "play https://www.youtube.com/watch?v=5aopMm7UGYA",
          "play https://www.youtube.com/watch?v=YjYHXGCFZWo",
        ],
      },
      ratelimit: 3,
      args: [
        {
          id: "url",
          type: "url",
          match: "rest",
        },
      ],
    });
  }
  public exec(
    message: Message,
    { url }: { url: string }
  ): Promise<Message> | void {
    if (!url) {
      return message.util.send(`${message.member} you must include a link`);
    }
    if (!message.member.voice.channel) {
      return message.util.send(
        `${message.member} you must be in a voice channel to play music.`
      );
    }
    message.member.voice.channel.join().then((connection) => {
      connection.play(ytdl(url.toString(), { filter: "audioonly" }));
    });
  }
}