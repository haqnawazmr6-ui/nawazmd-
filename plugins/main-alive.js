// JawadTechXD

const { cmd } = require('../command');
const os = require("os");

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

        // ⚡ React
        await conn.sendMessage(from, {
            react: {
                text: "⚡",
                key: m.key
            }
        });

        // ⏰ Uptime
        const formatUptime = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);

            return `${h}h ${m}m ${s}s`;
        };

        const uptime = formatUptime(process.uptime());

        // 💾 RAM
        const totalMem = os.totalmem() / 1024 / 1024 / 1024;
        const freeMem = os.freemem() / 1024 / 1024 / 1024;
        const usedMem = (totalMem - freeMem).toFixed(2);

        // 🌟 Ultra Stylish Alive Message
        const aliveText = `
╔════❖•ೋ° 🌸 °ೋ•❖════╗
        🤖 *NAWAZ - MD*
╚════❖•ೋ° 🌸 °ೋ•❖════╝

╭───────────────◆
│ 👑 *Owner*   : Nawaz
│ ⚡ *Status*  : Online
│ 🚀 *Runtime* : ${uptime}
│ 💾 *RAM*     : ${usedMem} GB
│ 🖥️ *Platform*: ${os.platform()}
╰───────────────◆

╭━━━〔 ✨ *SYSTEM ACTIVE* ✨ 〕━━━⬣
┃
┃ Hello *${pushname || "User"}* 👋
┃
┃ 🌸 Bot is running smoothly
┃ 🚀 All systems are online
┃ 💫 Enjoy using NAWAZ-MD
┃
╰━━━━━━━━━━━━━━━━━━━━⬣

> ⚡ Powered By NAWAZ TECH 🇵🇰
`;

        // 📩 Send Message
        await conn.sendMessage(from, {
            text: aliveText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363402493709861@newsletter",
                    newsletterName: "NAWAZ TECH 🇵🇰",
                    serverMessageId: 143
                }
            }
        }, {
            quoted: mek
        });

        // ✅ React
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
