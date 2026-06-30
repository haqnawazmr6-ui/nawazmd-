// config.js - Centralized configuration
require('dotenv').config();

const config = {

MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://jawadmd:irfanmd@cluster0.cqcxhti.mongodb.net/?appName=Cluster0',

DB_NAME: process.env.DB_NAME || 'jawadmd-x0',

COLLECTIONS: {
    SESSIONS: 'whatsapp_sessions',
    NUMBERS: 'active_numbers',
    CONFIGS: 'bot_configs'
},

AUTO_VIEW_STATUS: 'true',
AUTO_RECORDING: 'false',
AUTO_REACT: 'false',
AUTO_TYPING: 'false',
ALWAYS_ONLINE: 'true',

VERSION: '4.0.0 Bᴇᴛᴀ',
DESCRIPTION: '*© POWERED BY NAWAZTECHX*',

ANTI_DELETE_PATH: 'inbox',
ANTI_DELETE: 'false',
ANTI_EDIT_PATH: 'inbox',
ANTI_EDIT: 'false',

STICKER_NAME: 'NAWAZ-MD',
ANTI_LINK: 'true',

WELCOME: 'true',
GOODBYE: 'true',

WELCOME_MESSAGE: `╭─❖
│ 👋 Welcome @user
│ 🎉 Welcome to the group
│ ✨ Enjoy your stay
╰────────────❖`,

GOODBYE_MESSAGE: `╭─❖
│ 👋 Goodbye @user
│ 💔 Left the group
│ ✨ Take care
╰────────────❖`,

ADMIN_ACTION: 'true',
MODE: 'public',
PREFIX: '.',

ANTI_CALL: 'false',
REJECT_MSG: '*Call Rejected power by NAWAZ MD📵*',
READ_MESSAGE: 'false',
AUTO_STATUS_SEEN: 'true',
OWNER_REACT: 'false',

OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
REACT_EMOJIS: ['❣️', '💕', '🤍', '🤎', '🤎', '💙', '💚', '💛', '💗', '💜', '🖤', '🤗', '😊', '🥰', '💕', '🤩', '💚', '🤎', '💚', '🖤'],

BOT_NAME: '🄽🄰🅆🄰🅉 🄼🄳',
OWNER_NAME: 'ᏁᎪᎳᎪᏃ',
OWNER_NUMBER: '923067103522',
DEV: '923067103522',

IK_IMAGE_PATH: './lib/bot.png',
BOT_IMAGE: 'https://files.catbox.moe/ym9x7o.png',

MAX_RETRIES: 3,
OTP_EXPIRY: 300000,
BANNED: [],
MENTION_REPLY: 'false',

SUDO: [
    "923067103522@s.whatsapp.net"
],

DEFAULT_SETTINGS: {

    AUTO_VIEW_STATUS: 'true',
    AUTO_STATUS_SEEN: 'true',
    READ_MESSAGE: 'false',

    AUTO_RECORDING: 'false',
    AUTO_REACT: 'false',
    AUTO_TYPING: 'false',
    ALWAYS_ONLINE: 'true',
    OWNER_REACT: 'false',

    ANTI_DELETE: 'false',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_EDIT: 'false',
    ANTI_EDIT_PATH: 'inbox',
    ANTI_CALL: 'false',
    ANTI_LINK: 'true',

    WELCOME: 'true',
    GOODBYE: 'true',
    ADMIN_ACTION: 'true',

    WELCOME_MESSAGE: `╭─❖
│ 👋 Welcome @user
│ 🎉 Welcome to the group
│ ✨ Enjoy your stay
╰────────────❖`,

    GOODBYE_MESSAGE: `╭─❖
│ 👋 Goodbye @user
│ 💔 Left the group
│ ✨ Take care
╰────────────❖`,

    REJECT_MSG: '*Call Rejected power by NAWAZ MD 📵*',

    VERSION: '4.0.0 Bᴇᴛᴀ',
    OWNER_NAME: 'ᏁᎪᎳᎪᏃ',
    OWNER_NUMBER: '923067103522',
    DEV: '923067103522',
    DESCRIPTION: '*© POWER BY NAWAZTECHX *',
    STICKER_NAME: 'NAWAZ-MD',
    MODE: 'public',
    PREFIX: '.',
    BOT_NAME: '🄽🄰🅆🄰🅉 🄼🄳',
    BOT_IMAGE: 'https://files.catbox.moe/ym9x7o.png',

    REACT_EMOJIS: ['❣️', '💕', '🤍', '🤎', '🤎', '💙', '💚', '💛', '💗', '💜', '🖤', '🤗', '😊', '🥰', '💕', '🤩', '💚', '🤎', '💚', '🖤'],
    OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],

    MENTION_REPLY: 'false',

    BANNED: [],

    SUDO: [
        "923067103522@s.whatsapp.net"
    ]
}

};

module.exports = config;
