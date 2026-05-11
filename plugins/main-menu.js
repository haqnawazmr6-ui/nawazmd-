const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    alias: ["help"],
    react: "✨",
    desc: "Bot Menu",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {

try {

let menu = `
╭──────────────●●►
│ 🤖 *NAWAZ MD*
│ 👤 User : ${pushname}
│ ⚡ Prefix : ${config.PREFIX}
│ 📂 Commands : ${commands.length}
╰──────────────●●►
`;

const categoryMap = {};

for (let command of commands) {

    if (!command.pattern) continue;

    const category = command.category || "other";

    if (!categoryMap[category]) {
        categoryMap[category] = [];
    }

    categoryMap[category].push(command.pattern);
}

// CATEGORY LOOP
for (let cat in categoryMap) {

    menu += `

╭─❍ ${cat.toUpperCase()}
`;

    for (let cmd of categoryMap[cat]) {
        menu += `│ ➤ ${config.PREFIX}${cmd}\n`;
    }

    menu += `╰────────────⬣
`;
}

menu += `
> 🌸 NAWAZ MD FAST BOT
`;

// MENU SEND
await conn.sendMessage(from, {

    text: menu,

    contextInfo: {

        forwardingScore: 999,
        isForwarded: true,

        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363402493709861@newsletter",
            newsletterName: "NAWAZ TECH",
            serverMessageId: 1
        }
    }

}, { quoted: mek });


// AUDIO SEND
await conn.sendMessage(from, {

    audio: {
        url: "https://files.catbox.moe/mfht06"
    },

    mimetype: 'audio/mpeg',
    ptt: false,

    contextInfo: {

        forwardingScore: 999,
        isForwarded: true,

        externalAdReply: {
            title: "NAWAZ MD",
            body: "Islamic Audio Menu",
            mediaType: 1
        },

        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363402493709861@newsletter",
            newsletterName: "NAWAZ TECH",
            serverMessageId: 1
        }
    }

}, { quoted: mek });

} catch (e) {

console.log(e);

reply(`ERROR : ${e}`);

}

});
