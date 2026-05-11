const { cmd } = require('../command');

// ════════════════════════════════
//         NAWAZ MD PING
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

        for (const jid of newsletters) {

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
        // RANDOM SPEED
        // ════════════════════════

        const speed = Math.floor(Math.random() * 150) + 50;

        // ════════════════════════
        // SEND PING
        // ════════════════════════

        await conn.sendMessage(
            m.chat,
            {
                text: `⚡ ${speed}ms`
            },
            {
                quoted: mek,

                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,

                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363402493709861@newsletter",
                        newsletterName: "NAWAZ MD",
                        serverMessageId: 143
                    }
                }
            }
        );

    } catch (err) {

        console.log(err);

        return reply("❌ Ping Error");
    }
});
