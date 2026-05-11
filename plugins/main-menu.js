const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    alias: ["panel", "commands"],
    react: "📜",
    desc: "Bot Menu",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {

try {

const pp = "https://files.catbox.moe/rh6bx2.png";

let menu = `
╔══════════════════════╗
║      🤖 NAWAZ TECH 🤖
╠══════════════════════╣
║ 👤 User : ${pushname}
║ ⚡ Prefix : ${config.PREFIX}
║ 📂 Total Cmds : ${commands.length}
╚══════════════════════╝
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

    menu += `

╭━━━〔 ${cat.toUpperCase()} 〕━━━⬣
`;

    for (let cmd of categories[cat]) {
        menu += `┃➤ ${config.PREFIX}${cmd}\n`;
    }

    menu += `╰━━━━━━━━━━━━━━━━⬣
`;
}

menu += `
╔══════════════════════╗
║ 🔥 Powered By NAWAZ TECH
║ ⚡ Fast WhatsApp Bot
╚══════════════════════╝
`;

await conn.sendMessage(from, {
    image: { url: pp },
    caption: menu,

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

} catch (e) {
console.log(e);
reply(`${e}`);
}

});
