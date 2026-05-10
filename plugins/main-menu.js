const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    alias: ["panel","commands"],
    react: "📜",
    desc: "Bot Menu",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {

try {

let menu = `
╭──⚡ MENU ⚡──╮
│ 👤 ${pushname}
│ 🔥 Prefix : ${config.PREFIX}
│ 🤖 Commands : ${commands.length}
╰────────────╯
`;

const categories = {};

for (let command of commands) {

    if (!command.pattern) continue;

    const category = command.category || "other";

    if (!categories[category]) {
        categories[category] = [];
    }

    categories[category].push(command.pattern);
}

for (let cat in categories) {

    menu += `\n📌 ${cat.toUpperCase()}\n`;

    for (let cmd of categories[cat]) {
        menu += `• ${cmd}\n`;
    }
}

await conn.sendMessage(from, {
    image: {
        url: "https://files.catbox.moe/rh6bx2.png"
    },
    caption: menu,

    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,

        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363402493709861@newsletter",
            newsletterName: "NAWAZ TECH",
            serverMessageId: 1
        }
    }

}, { quoted: mek });

} catch (e) {
console.log(e);
reply(`${e}`);
}

});
