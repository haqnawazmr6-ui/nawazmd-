const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `> N̥ͦḀͦW̥ͦḀͦZ̥ͦ-🄼🄳 Տᑭᗴᗴᗪ ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,

                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402493709861@newsletter',
                    newsletterName: "NawazTech",
                    serverMessageId: 143
                },

                externalAdReply: {
                    title: "NAWAZ-MD",
                    body: `⚡ Speed ${responseTime.toFixed(2)}ms`,
                    thumbnailUrl: "https://files.catbox.moe/tbgc88.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029VbBCecV7T8bVXoCicf0D",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
