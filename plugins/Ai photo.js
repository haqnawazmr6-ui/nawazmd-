// ═══════════════════════════════════════
// 🤖 AI IMAGE COMMAND - NAWAZ MD
// ═══════════════════════════════════════

const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "imagine",
    alias: ["aiimg","imgai","aipic"],
    desc: "Generate AI Images",
    category: "ai",
    react: "🎨",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("*🎨 Example : .imagine Cyberpunk Lion*");

await conn.sendMessage(from, {
    react: { text: '⏳', key: mek.key }
});

const api = `https://api.popcat.xyz/v2/imagine?prompt=${encodeURIComponent(q)}`;

await conn.sendMessage(from, {
    image: { url: api },
    caption: `╭━━━〔 🤖 AI IMAGE 〕━━━⬣
┃ 🎨 Prompt : ${q}
┃ ⚡ Powered By NAWAZ MD
╰━━━━━━━━━━━━━━━━⬣`
}, { quoted: mek });

await conn.sendMessage(from, {
    react: { text: '✅', key: mek.key }
});

} catch (e) {
console.log(e);
reply("*❌ Error generating AI image!*");
}
});
