const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

// SMALL CAPS
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';

    const smallCapsMap = {
        'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ',
        'j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ',
        's':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ'
    };

    return text
        .split('')
        .map(char => smallCapsMap[char.toLowerCase()] || char)
        .join('');
};

// FORMAT CATEGORY
const formatCategory = (category, cmds) => {

    const validCmds = cmds.filter(
        cmd => cmd.pattern && cmd.pattern.trim() !== ''
    );

    if (validCmds.length === 0) return '';

    let title = `
╭──❲ *${category.toUpperCase()}* ❳───┈⊰
`;

    let body = validCmds.map(cmd => {
        return `│ ○ ${toSmallCaps(cmd.pattern)}`;
    }).join('\n');

    let footer = `
╰─────────────┈⊰`;

    return `${title}${body}${footer}`;
};

// MENU COMMAND
cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu", "fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply, userConfig }) => {

    try {

        // BOT INFO
        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "NAWAZ MD";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "NAWAZ";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "public";
        const VERSION = userConfig?.VERSION || config.VERSION || "1.0.0";

        // MAIN MENU
        let optionText = `
╭━━━〔 *${BOT_NAME}* 〕━━━┈⊰
┃
┃ ✦ *Owner* : ${OWNER_NAME}
┃ ✦ *Runtime* : ${runtime(process.uptime())}
┃ ✦ *Prefix* : ${PREFIX}
┃ ✦ *Mode* : ${MODE}
┃ ✦ *Version* : ${VERSION}
┃
┣━━━━━━━━━━━━━━━┈⊰
┃
┃ ❶ ➤ OWNER MENU
┃ ❷ ➤ GROUP MENU
┃ ❸ ➤ DOWNLOAD MENU
┃ ❹ ➤ FUN MENU
┃ ❺ ➤ MAIN MENU
┃
╰━━━━━━━━━━━━━━━┈⊰

> _Reply With Number To Open Menu_
`;

        // SEND MAIN MENU
        const sentMsg = await conn.sendMessage(from, {
            image: {
                url: 'https://files.catbox.moe/tbgc88.jpg'
            },
            caption: optionText,
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

        // REPLY HANDLER
        const replyHandler = async ({ messages }) => {

            try {

                const msg = messages[0];
                if (!msg.message) return;

                const text =
                    msg.message.conversation ||
                    msg.message.extendedTextMessage?.text ||
                    '';

                const replyId =
                    msg.message?.extendedTextMessage?.contextInfo?.stanzaId;

                // SAME CHAT
                if (msg.key.remoteJid !== from) return;

                // SAME USER
                const sender =
                    msg.key.participant ||
                    msg.key.remoteJid;

                if (sender !== m.sender) return;

                // CHECK REPLY
                if (replyId !== sentMsg.key.id) return;

                let selectedCategory = '';

                if (text === '1') {
                    selectedCategory = 'owner';
                } else if (text === '2') {
                    selectedCategory = 'group';
                } else if (text === '3') {
                    selectedCategory = 'download';
                } else if (text === '4') {
                    selectedCategory = 'fun';
                } else if (text === '5') {
                    selectedCategory = 'main';
                } else {
                    return;
                }

                // FILTER COMMANDS
                const filteredCmds = Object.values(commands).filter(
                    cmd =>
                        cmd.category &&
                        cmd.category.toLowerCase() === selectedCategory
                );

                // CATEGORY MENU
                let menuText = `
╭━━━〔 *${selectedCategory.toUpperCase()} MENU* 〕━━━┈⊰
┃
┃ ✦ *Bot* : ${BOT_NAME}
┃ ✦ *Commands* : ${filteredCmds.length}
┃ ✦ *Version* : ${VERSION}
┃
╰━━━━━━━━━━━━━━━┈⊰
`;

                menuText += formatCategory(selectedCategory, filteredCmds);

                // SEND CATEGORY MENU
                await conn.sendMessage(from, {
                    image: {
                        url: 'https://files.catbox.moe/vdjt83.png'
                    },
                    caption: menuText,
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
                }, { quoted: msg });

                // REMOVE EVENT
                conn.ev.off('messages.upsert', replyHandler);

            } catch (err) {
                console.log(err);
            }
        };

        // ADD EVENT
        conn.ev.on('messages.upsert', replyHandler);

        // AUTO REMOVE AFTER 60 SEC
        setTimeout(() => {
            conn.ev.off('messages.upsert', replyHandler);
        }, 60000);

    } catch (e) {

        console.log(e);
        reply(`${e}`);

    }
});
