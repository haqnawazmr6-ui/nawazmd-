const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["pong","speed"],
    desc: "Bot Status",
    category: "main",
    react: "⚡",
    filename: __filename
},
async(conn, mek, m, { reply }) => {

    const start = new Date().getTime();
    const end = new Date().getTime();
    const speed = end - start;

    const aliveMsg = `
╔════◇
║ ⚡ 𝙉𝘼𝙒𝘼𝙕 𝙈𝘿 ⚡
╠══════════◇
║ 🤖 Status : Online
║ 🚀 Speed : ${speed}ms
║ 👑 Owner : Nawaz MD
║ 📅 Runtime : Active
╚══════════◇

┏━━〔 📢 CHANNELS 〕━━⬣
┃❏ 1 ➠ https://whatsapp.com/channel/0029Vb7xqgTBadmdXadQBn0C
┃❏ 2 ➠ https://whatsapp.com/channel/0029VbCQjLGLo4hYCzkH4e2L
┃❏ 3 ➠ https://whatsapp.com/channel/0029Vb8Sqf3Badmb2pgnSW2y
┗━━━━━━━━━━━━━━⬣

> ⚡ POWERED BY NAWAZ MD ⚡
`;

    await conn.sendMessage(
        m.chat,
        {
            video: { url: "https://files.catbox.moe/0a6kuw.mp4" },
            gifPlayback: true,
            caption: aliveMsg,

            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,

                externalAdReply: {
                    title: "⚡ NAWAZ MD ⚡",
                    body: "BEST WHATSAPP BOT",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: "https://files.catbox.moe/rh6bx2.png",
                    sourceUrl: "https://whatsapp.com/channel/0029VbBCecV7T8bVXoCicf0D"
                }
            }
        },
        { quoted: mek }
    );

});
