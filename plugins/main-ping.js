const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["pong","speed"],
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

    try {

        const start = Date.now();

        const speed = Date.now() - start;

        await conn.sendMessage(from, {
            text: `⚡ Speed : ${speed}ms`,
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
