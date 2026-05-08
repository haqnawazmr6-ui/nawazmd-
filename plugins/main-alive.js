// JawadTechXD 

const { cmd, commands } = require('../command');
const os = require("os");
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["live"],
    desc: "Check Bot Status",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {

        // ⏳ React
        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: m.key
            }
        });

        // Delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Uptime
        const formatUptime = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);

            return `${h}h ${m}m ${s}s`;
        };

        const uptime = formatUptime(process.uptime());

        // RAM
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);

        // Message
        const aliveText = `
╭━━━〔 *NAWAZ-MD ALIVE* 〕━━━⬣
┃ 🤖 *Bot:* NAWAZ-MD
┃ 👑 *Owner:* nawaz 
┃ ⚡ *Status:* Online
┃ ⏰ *Uptime:* ${uptime}
┃ 💾 *RAM:* ${usedMem} GB
┃ 🖥️ *Platform:* ${os.platform()}
╰━━━━━━━━━━━━━━━━━━⬣

> Hello ${pushname || "User"} 👋
> I am alive now 🚀
`;

        // Send Alive + Channel Forward
        await conn.sendMessage(from, {
            text: aliveText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363420152871714@newsletter",
                    newsletterName: "𝐍𝆭𝛂𝆭Ꮿ𝆭𝛂ʑ̽ Tech🇵🇰",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "𝐍𝆭𝛂𝆭Ꮿ𝆭𝛂ʑ̽ Tech🇵🇰",
                    body: "Join Our WhatsApp Channel 🚀",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    sourceUrl: "https://whatsapp.com/channel/0029VbBCecV7T8bVXoCicf0D"
                }
            }
        }, {
            quoted: mek
        });

        // ✅ React
        await new Promise(resolve => setTimeout(resolve, 800));

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.log(e);

        // ❌ Error React
        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

        reply(`❌ Error: ${e.message}`);
    }
});
