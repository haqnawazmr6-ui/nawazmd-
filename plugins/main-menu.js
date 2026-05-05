const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

// Helper function for small caps text
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const smallCapsMap = {
        'a': 'ᴀ','b': 'ʙ','c': 'ᴄ','d': 'ᴅ','e': 'ᴇ','f': 'ғ','g': 'ɢ','h': 'ʜ','i': 'ɪ',
        'j': 'ᴊ','k': 'ᴋ','l': 'ʟ','m': 'ᴍ','n': 'ɴ','o': 'ᴏ','p': 'ᴘ','q': 'ǫ','r': 'ʀ',
        's': 's','t': 'ᴛ','u': 'ᴜ','v': 'ᴠ','w': 'ᴡ','x': 'x','y': 'ʏ','z': 'ᴢ',
        'A': 'ᴀ','B': 'ʙ','C': 'ᴄ','D': 'ᴅ','E': 'ᴇ','F': 'ғ','G': 'ɢ','H': 'ʜ','I': 'ɪ',
        'J': 'ᴊ','K': 'ᴋ','L': 'ʟ','M': 'ᴍ','N': 'ɴ','O': 'ᴏ','P': 'ᴘ','Q': 'ǫ','R': 'ʀ',
        'S': 's','T': 'ᴛ','U': 'ᴜ','V': 'ᴠ','W': 'ᴡ','X': 'x','Y': 'ʏ','Z': 'ᴢ'
    };
    return text.split('').map(char => smallCapsMap[char] || char).join('');
};

const formatCategory = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return '';
    
    let title = `\n\n╭──❲ *${category.toUpperCase()}* ❳───┈⊰\n`;
    let body = validCmds.map(cmd => {
        return `│  ○  ${toSmallCaps(cmd.pattern)}`;
    }).join('\n');
    let footer = `\n╰─────────────┈⊰`;
    return `${title}${body}${footer}`;
};

const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const imageExtensions = ['.jpg','.jpeg','.png','.gif','.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

cmd({
    pattern: "menu",
    alias: ["m","help","allmenu","fullmenu"],
    desc: "Show all bot commands",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply, userConfig }) => {
    try {

        await conn.sendPresenceUpdate('composing', from);

        let totalCommands = Object.keys(commands).length;

        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(c => c);
        
        const categorized = {};
        categories.forEach(cat => {
            const valid = Object.values(commands).filter(c => c.category === cat && c.pattern);
            if (valid.length > 0) categorized[cat] = valid;
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

        const localImage = path.join(__dirname, '../lib/nawaz.jpg');
        let imageToUse = isValidImageUrl(BOT_IMAGE) ? BOT_IMAGE : localImage;

        // ✅ 1. SEND MENU (UNCHANGED)
        await conn.sendMessage(from, {
            image: { url: imageToUse },
            caption: dec
        }, { quoted: mek });

        // ✅ 2. SMALL DELAY
        await new Promise(r => setTimeout(r, 1500));

        // ✅ 3. SEND AUDIO
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/ay0es0" },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
