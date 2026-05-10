const { cmd } = require('../command');

cmd({
    pattern: "alive",
    alias: ["live"],
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

    try {

        await conn.sendMessage(from, {
            text: `⚡ Bot Active`,
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
