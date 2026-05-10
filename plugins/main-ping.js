const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["pong","speed"],
    use: '.ping',
    desc: "Check Bot Speed",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {

    try {

        const start = new Date().getTime();

        const emojis = ['⚡','🚀','🔥','💎','✨','🌙','🎯','🌀'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        // React
        await conn.sendMessage(from, {
            react: {
                text: emoji,
                key: mek.key
            }
        });

        const end = new Date().getTime();
        const speed = end - start;

        const pingText = `
╭──────────────────⬣
│  ⚡ *N A W A Z - M D*
├──────────────────⬣
│  🚀 Speed   : ${speed}ms
│  🔥 Status  : Online
│  💎 Version : 6.0
│  🌙 Mode    : Public
│  ✨ Engine  : Active
╰──────────────────⬣

> ${emoji} *Fast Response Successfully Connected*
`;

        await conn.sendMessage(from, {
            text: pingText,
            contextInfo: {
                mentionedJid: [sender],

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
