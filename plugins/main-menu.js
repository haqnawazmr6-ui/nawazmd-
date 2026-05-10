const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "menu",
    alias: ["panel", "commands"],
    react: "📜",
    desc: "Bot Menu",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply, sender }) => {

try {

const menuText = `
╭━━━〔 *🤖 NAWAZ MD MENU 🤖* 〕━━━┈⊷
┃✦ Owner : ${config.OWNER_NAME}
┃✦ User : ${pushname}
┃✦ Prefix : ${config.PREFIX}
┃✦ Mode : Public
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *📌 MAIN MENU* 〕━━┈⊷
┃➤ alive
┃➤ ping
┃➤ menu
┃➤ owner
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *👑 OWNER MENU* 〕━━┈⊷
┃➤ shutdown
┃➤ restart
┃➤ block
┃➤ unblock
┃➤ setpp
┃➤ anticall on/off
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *👥 GROUP MENU* 〕━━┈⊷
┃➤ kick
┃➤ add
┃➤ promote
┃➤ demote
┃➤ mute
┃➤ unmute
┃➤ tagall
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *🎵 DOWNLOAD MENU* 〕━━┈⊷
┃➤ song
┃➤ video
┃➤ play
┃➤ tiktok
┃➤ fb
┃➤ insta
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *⚡ POWERED BY NAWAZ MD* 〕━━┈⊷
┃🔥 Simple • Fast • Powerful
╰━━━━━━━━━━━━━━━┈⊷
`;

await conn.sendMessage(
    from,
    {
        image: {
            url: "https://files.catbox.moe/rh6bx2.png"
        },
        caption: menuText,

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
                body: "Simple • Fast • Powerful",
                thumbnailUrl: "https://files.catbox.moe/rh6bx2.png",
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: false
            }
        }
    },
    { quoted: mek }
);


// AUDIO 1
await conn.sendMessage(
    from,
    {
        audio: {
            url: "https://files.catbox.moe/3ctzis.mp3"
        },
        mimetype: "audio/mpeg",
        ptt: false 
    },
    { quoted: mek }
);


// AUDIO 2
await conn.sendMessage(
    from,
    {
        audio: {
            url: "https://files.catbox.moe/g5p3hr.mp3"
        },
        mimetype: "audio/mpeg",
        ptt: false
    },
    { quoted: mek }
);

} catch (e) {
console.log(e);
reply(`${e}`);
}

});
