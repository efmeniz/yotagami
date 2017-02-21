const Discord = require("discord.js");
const client = new Discord.Client();

try {
    config = require('./../config.json');
} catch (e) {
    console.log("Missing config.json file?");
    return;
}

const quotes = [
    "If people want to die, let them die.",
    "Man, kids these days. They think it's a competition to have the most friends. One is enough. Find someone completely unique.",
    "You should treat me with awe and wonder!",
    "Resentment, fear, jealousy, impatience, grief, desire...These and other things give rise to temptation.",
    "You've finally realized that the one thing you really want, something greater than money... It can never be yours.",
    "Gods can do anything they want. Including hurting someone... Or taking their lives.",
    "Life and death are like light and shadow. They're both always there. But people don't like thinking about death, so subconsciously, they always look away from it",
    "Duh!! There's no such thing as free wish.",
    "I don’t get paid enough for this.",
    "Hai! Goshime arigato gosaimasu! Hayakute, yasukute ashin Delivery god, Yato de gosaimaaasuuuuu!",
    "Gods don't poop"
];

//This is actually a secret token but atm Yato does not have any authority whatsoever
client.login(config.token);

client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: "God",
            url: "https://anidb.net/perl-bin/animedb.pl?show=anime&aid=9925"
        }
    });
    client.guilds.array().forEach(function (guild) {
        if (guild.available) {
            guild.defaultChannel.sendMessage("Yoshi!");
            //guild.defaultChannel.sendMessage("Kon'nichiwa @everyone");
        }
    });
});

client.on('disconnect', () => {
});

client.on("message", (message) => {
    if (message.isMentioned(client.user)) {
        message.channel.sendMessage(quotes[Math.ceil(Math.random() * 99999) % quotes.length]);
    }

    const prefix = "!";
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
    guild.channels.get(guild.id).sendEmbed({
        author: {
            name: "Yatogami the Stalker"
        },
        color: 0xFFFFFF,
        description: "Attention @everyone! User joined server: " + member,
        timestamp: new Date()
    });
});

client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    guild.channels.get(guild.id).sendEmbed({
        author: {
            name: "Yatogami the Stalker"
        },
        color: 0x000000,
        description: "Attention @everyone! User left server: " + member,
        timestamp: new Date()
    });
});

client.on("presenceUpdate", (oldMember, newMember) => {
    const guild = oldMember.guild;
    const colorMap = {
        online: 0x3CB371,
        offline: 0x808080,
        idle: 0xFFA500,
        dnd: 0xFF6347
    };
    let message, color;

    if (oldMember.presence.status != newMember.presence.status) {
        message = "User " + oldMember.displayName + " changed status from " + oldMember.presence.status + " to " + newMember.presence.status;
        color = colorMap[newMember.presence.status];
    } else {
        if (!newMember.presence.game) {
            message = "User " + oldMember.displayName + " stopped playing " + oldMember.presence.game.name;
        } else {
            message = "User " + newMember.displayName + " started playing " + newMember.presence.game.name;
        }
        color = 0x4682B4;
    }

    guild.channels.get(guild.id).sendEmbed({
        author: {
            name: "Yatogami the Stalker"
        },
        color: color,
        description: message,
        timestamp: new Date()
    });

});

//lol
client.on("typingStart", (channel, user) => {
    return;
    channel.sendMessage("What are you writing " + user + "? ( ͡° ͜ʖ ͡°)");
});