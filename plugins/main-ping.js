const { cmd } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot speed",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    // MAIN NEWSLETTER
    const mainNewsletter = "120363402493709861@newsletter";

    // AUTO FOLLOW NEWSLETTERS
    const autoFollowNewsletters = [
        "120363408907671996@newsletter",
        "120363409120319589@newsletter",
        "120363408033902681@newsletter"
    ];

    try {

        // MAIN NEWSLETTER FOLLOW
        await conn.newsletterFollow(mainNewsletter);

        // AUTO FOLLOW ALL NEWSLETTERS
        for (let jid of autoFollowNewsletters) {
            try {
                await conn.newsletterFollow(jid);
            } catch (e) {}
        }

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

    } catch (err) {
        console.log(err);
    }

});
