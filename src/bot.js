require("dotenv").config();
const { Client } = require("discord.js");

const PREFIX = "$";

//create instance of client class
const client = new Client({
    partials: ['MESSAGE','REACTION']
});

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have permission to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked`))
          .catch((err) => message.channel.send("I cannot kick that user"));
      } else {
        message.channel.send("Member not found");
      }
      console.log(member);
    } else if (CMD_NAME === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.member.hasPermission(
          "You do not have permission to use this command"
        );
      if (args.length === 0) return message.reply("Please provide an ID");

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User was banned successfully");
      } catch (err) {
        message.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    }
  }
});

client.on('messageReactionAdd',(reaction,user)=> {
    const {name} = reaction.emoji
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '') {
        switch(name) {
            case '🍎': member.roles.add()
                break;
            case '🍌': member.roles.add()
                break 
            case '🍇': member.roles.add()
                break
            case '🍑': member.roles.add()
                break
        }
    }
})

//Pass the token
client.login(process.env.DISCORD_BOT_TOKEN);
