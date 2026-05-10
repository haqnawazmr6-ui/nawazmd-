// ═══════════════════════════════════════
// 💯 FAKE REACT COMMAND - CLEAN VERSION
// ═══════════════════════════════════════

const { cmd } = require('../command');

cmd({
    pattern: "freact",
    alias: ["faker","reactx"],
    desc: "Send Fake Channel React",
    category: "fun",
    react: "🔥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("*Example : .freact Hello*");

await conn.sendMessage(from, {
    text: q,
    contextInfo: {
        forwardingScore: 100,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363402493709861@newsletter",
            newsletterName: "🔥 NAWAZ MD 🔥",
            serverMessageId: 143
        }
    }
}, { quoted: mek });

await conn.sendMessage(from, {
    react: {
        text: "💯",
        key: mek.key
    }
});

} catch (e) {
console.log(e);
reply("*❌ Error Occurred!*");
}
});
