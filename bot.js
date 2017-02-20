const Discord = require("discord.js");
const client = new Discord.Client();

//This is actually a secret token but atm Yota does not have any authority whatsoever
client.login("MjgzMTUwMDc3NzM0OTQ0Nzcw.C4w3rw.UujTSUI-1pksmfegCc3mxd06j8E");

client.on('ready', () => {
  console.log('I am ready!');
});


client.on("message", (message) => {
  let prefix = "!";
  
  if (message.author.bot) return;
  
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.sendMessage("pong!");
  } else if (message.content.startsWith(prefix + "foo")) {
    message.channel.sendMessage("bar!");
  }
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  guild.channels.get(guild.id).sendMessage("User joined channel: " + member.user);
});
