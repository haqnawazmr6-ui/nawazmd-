const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

// Small caps
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const map = {
        'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ',
        'j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ',
        's':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ'
    };
    return text.split('').map(c => map[c] || c).join('');
};

// Format category
const formatCategory = (category, cmds) => {
    const valid = cmds.filter(cmd => cmd.pattern);
    if (!valid.length) return '';
    
    return `\n\n╭──❲ *${category.toUpperCase()}* ❳───┈⊰\n` +
    valid.map(c => `│ ○ ${toSmallCaps(c.pattern)}`).join('\n') +
    `\n╰─────────────┈⊰`;
};

// Check image url
const isValidImageUrl = (url) => {
    if (!url) return false;
    return ['.jpg','.jpeg','.png','.webp'].some(ext => url.toLowerCase().endsWith(ext));
};

cmd({
    pattern: "menu",
    alias: ["m","help","allmenu","fullmenu"],
    desc: "Show all commands",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply, userConfig }) => {
    try {

        await conn.sendPresenceUpdate('composing', from);

        let totalCommands = Object.keys(commands).length;

        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(Boolean);

        const categorized = {};
        categories.forEach(cat => {
            const valid = Object.values(commands).filter(c => c.category === cat && c.pattern);
            if (valid.length) categorized[cat] = valid;
        });

        let menuSections = '';
        for (const [cat, cmds] of Object.entries(categorized)) {
            menuSections += formatCategory(cat, cmds);
        }

        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "Bot";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Owner";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "private";
        const VERSION = userConfig?.VERSION || config.VERSION || "1.0.0";
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        const BOT_IMAGE = userConfig?.BOT_IMAGE || config.BOT_IMAGE;
        const localImage = path.join(__dirname, '../lib/nawaz.jpg');

        let imageToUse = isValidImageUrl(BOT_IMAGE) ? BOT_IMAGE : localImage;

        let dec = `╭━━━〔 *${BOT_NAME}* 〕━━━┈⊰
┃ ✦ Owner : ${OWNER_NAME}
┃ ✦ Commands : ${totalCommands}
┃ ✦ Runtime : ${runtime(process.uptime())}
┃ ✦ Prefix : ${PREFIX}
┃ ✦ Mode : ${MODE}
┃ ✦ Version : ${VERSION}
╰━━━━━━━━━━━━━━━┈⊰
${menuSections}

>*${DESCRIPTION}*`;

        // ✅ 1. SEND MENU + CHANNEL
        await conn.sendMessage(from, {
            image: { url: imageToUse },
            caption: dec,
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

        // ⏳ delay
        await new Promise(r => setTimeout(r, 1500));

        // ✅ 2. SEND AUDIO (100% working method)
        const audioBuffer = await axios.get("https://files.catbox.moe/ay0es0", {
            responseType: "arraybuffer"
        });

        await conn.sendMessage(from, {
            audio: audioBuffer.data,
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
