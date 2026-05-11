const { cmd } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot speed",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    const start = new Date().getTime();

    const sent = await conn.sendMessage(
        m.chat,
        {
            text: `*ɴᴀᴡᴀᴢ-ᴍᴅ*

┃ You
┃ .ping
┃
┃ *ɴᴀᴡᴀᴢ-ᴍᴅ ꜱᴘᴇᴇᴅ:* 0.01ms 🕐`,

            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,

                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363402493709861@newsletter",
                    newsletterName: "ɴᴀᴡᴀᴢ-ᴍᴅ",
                    serverMessageId: 143
                }
            }
        },
        { quoted: mek }
    );

    const end = new Date().getTime();
    const speed = end - start;

    await conn.sendMessage(
        m.chat,
        {
            edit: sent.key,
            text: `*ɴᴀᴡᴀᴢ-ᴍᴅ*

┃ You
┃ .ping
┃
┃ *ɴᴀᴡᴀᴢ-ᴍᴅ ꜱᴘᴇᴇᴅ:* ${speed}ms 🕐`,
        }
    );

});
