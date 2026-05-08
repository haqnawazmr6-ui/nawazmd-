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
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
        's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
        'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
        'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
        'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
    };
    return text.split('').map(char => smallCapsMap[char] || char).join('');
};

// Format category with cleaner style
const formatCategory = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    
    if (validCmds.length === 0) return '';
    
    let title = `\n\n╭──❲ *${category.toUpperCase()}* ❳───┈⊰\n`;
    let body = validCmds.map(cmd => {
        const commandName = cmd.pattern || '';
        return `│  ○  ${toSmallCaps(commandName)}`;
    }).join('\n');
    let footer = `\n╰─────────────┈⊰`;
    return `${title}${body}${footer}`;
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, userConfig }) => {
    try {

        // Typing
        await conn.sendPresenceUpdate('composing', from);
        
        let totalCommands = Object.keys(commands).length;
        
        // Categories
        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(cat => 
            cat && cat.trim() !== '' && cat !== 'undefined'
        );
        
        // Organize Commands
        const categorized = {};
        
        categories.forEach(cat => {
            const categoryCommands = Object.values(commands).filter(c => c.category === cat);
            
            const validCommands = categoryCommands.filter(cmd => 
                cmd.pattern && cmd.pattern.trim() !== ''
            );
            
            if (validCommands.length > 0) {
                categorized[cat] = validCommands;
            }
        });

        // Menu Sections
        let menuSections = '';
        
        for (const [category, cmds] of Object.entries(categorized)) {
            
            if (cmds && cmds.length > 0) {
                
                const section = formatCategory(category, cmds);
                
                if (section !== '') {
                    menuSections += section;
                }
            }
        }

        // Config
        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "Bot";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Owner";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "private";
        const VERSION = userConfig?.VERSION || config.VERSION || "1.0.0";
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";
        
        // Menu Text
        let dec = `╭━━━〔 *${BOT_NAME}* 〕━━━┈⊰
┃
┃  ✦  *Owner* : ${OWNER_NAME}
┃  ✦  *Commands* : ${totalCommands}
┃  ✦  *Runtime* : ${runtime(process.uptime())}
┃  ✦  *Prefix* : ${PREFIX}
┃  ✦  *Mode* : ${MODE}
┃  ✦  *Version* : ${VERSION}
┃
╰━━━━━━━━━━━━━━━┈⊰

${menuSections}

>*${DESCRIPTION}*`;

        // SEND MENU WITH IMAGE FROM URL ONLY
        await conn.sendMessage(from, { 
            image: { url: 'https://files.catbox.moe/tbgc88.jpg' },
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

        // SEND AUDIO (UNMODIFIED)
        const audioData = await axios.get(
            'https://files.catbox.moe/63w57g',
            {
                responseType: 'arraybuffer'
            }
        );

        await conn.sendMessage(from, {
            audio: Buffer.from(audioData.data),
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

    } catch (e) { 
        
        console.log(e); 
        
        reply(`Error: ${e}`); 
    } 
});
