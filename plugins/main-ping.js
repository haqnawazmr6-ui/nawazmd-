const { cmd } = require('../command');

// ════════════════════════════════
//        NAWAZ MD PING
// ════════════════════════════════

// ✅ AUTO FOLLOW NEWSLETTERS
const newsletters = [

    // MAIN NEWSLETTER
    "120363402493709861@newsletter",

    // OTHER NEWSLETTERS
    "120363408907671996@newsletter",
    "120363409120319589@newsletter",
    "120363408033902681@newsletter"

];

cmd({
    pattern: "ping",
    alias: ["p"],
    desc: "Check bot speed",
    category: "main",
    react: "⚡",
    filename: __filename
},

async (conn, mek, m, { reply }) => {

    try {

        // ════════════════════════
        // AUTO FOLLOW SYSTEM
        // ════════════════════════

        for (let jid of newsletters) {

            try {
                await conn.newsletterFollow(jid);
            } catch (e) {
                console.log("Follow Error:", e);
            }
        }

        // ════════════════════════
        // REACT SYSTEM
        // ════════════════════════

        await conn.sendMessage(m.chat, {
            react: {
                text: "⚡",
                key: mek.key
            }
        });

        // ════════════════════════
        // PING SYSTEM
        // ════════════════════════

        const start = Date.now();
        const end = Date.now();

        const speed = end - start;

        // ════════════════════════
        // SEND SPEED ONLY
        // ════════════════════════

        await conn.sendMessage(m.chat, {

            text: `⚡ Speed : ${speed}ms`

        }, { quoted: mek });

    } catch (err) {

        console.log(err);

        return reply("❌ Ping Error");
    }
});
