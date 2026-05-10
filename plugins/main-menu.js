const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    alias: ["help", "allmenu"],
    desc: "Simple Menu",
    category: "main",
    react: "📜",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply, userConfig }) => {

try {

const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "NAWAZ MD";
const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Nawaz";
const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";

let menu = `
╭━━━〔 *${BOT_NAME}* 〕━━━⊷
┃👤 User : ${pushname || "User"}
┃🤖 Owner : ${OWNER_NAME}
┃⚡ Prefix : ${PREFIX}
┃📦 Commands : ${commands?.length || 0}
╰━━━━━━━━━━━━━━━━⊷

╭━━〔 *MAIN MENU* 〕━━⊷
┃➤ alive
┃➤ ping
┃➤ menu
┃➤ owner
╰━━━━━━━━━━━━━━⊷

╭━━〔 *DOWNLOAD MENU* 〕━━⊷
┃➤ song
┃➤ video
┃➤ play
┃➤ tiktok
┃➤ fb
┃➤ insta
╰━━━━━━━━━━━━━━⊷

╭━━〔 *GROUP MENU* 〕━━⊷
┃➤ kick
┃➤ add
┃➤ promote
┃➤ demote
┃➤ mute
┃➤ unmute
┃➤ tagall
╰━━━━━━━━━━━━━━⊷

╭━━〔 *OWNER MENU* 〕━━⊷
┃➤ block
┃➤ unblock
┃➤ setpp
┃➤ restart
┃➤ shutdown
╰━━━━━━━━━━━━━━⊷

╭━━〔 *FUN MENU* 〕━━⊷
┃➤ joke
┃➤ quote
┃➤ fact
┃➤ truth
┃➤ dare
╰━━━━━━━━━━━━━━⊷

> ${config.DESCRIPTION || "Simple WhatsApp Bot"}
`;

await conn.sendMessage(from, {
    image: {
        url: 'https://files.catbox.moe/tbgc88.jpg'
    },

    caption: menu,

    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,

        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402493709861@newsletter',
            newsletterName: BOT_NAME,
            serverMessageId: 143
        }
    }

}, { quoted: mek });

} catch (e) {

console.log(e);

reply("Menu Error");

}

});
