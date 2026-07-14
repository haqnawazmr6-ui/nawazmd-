// config.js - Centralized configuration
require('dotenv').config();

const config = {
// MongoDB Configuration (only this is from process.env)
MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://jawadmd:irfanmd@cluster0.cqcxhti.mongodb.net/?appName=Cluster0',

// Fixed Database Name  
DB_NAME: process.env.DB_NAME || 'jawadmd-x0',  
  
// Collections Configuration  
COLLECTIONS: {  
    SESSIONS: 'whatsapp_sessions',  
    NUMBERS: 'active_numbers',  
    CONFIGS: 'bot_configs'  
},  
  
// Bot Configuration  
AUTO_VIEW_STATUS: 'true',  
AUTO_RECORDING: 'false',  
AUTO_REACT: 'false',  
AUTO_TYPING: 'false',  
ALWAYS_ONLINE: 'false',  
VERSION: '5.0.0 Bᴇᴛᴀ',  
DESCRIPTION: '*© POWERED BY NAWAZTECHX*',  
ANTI_DELETE_PATH: 'inbox',  
ANTI_DELETE: 'false',  
ANTI_EDIT_PATH: 'inbox',  
ANTI_EDIT: 'false',  
STICKER_NAME: 'Nawaz-MD',  
ANTI_LINK: 'true',  
WELCOME: 'false',  
GOODBYE: 'false',  
WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',  
GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',  
ADMIN_ACTION: 'false',  
MODE: 'public',  
PREFIX: '.',  
ANTI_CALL: 'false',  
REJECT_MSG: '*Call Rejected Automatically 📵*',  
READ_MESSAGE: 'false',  
AUTO_STATUS_SEEN: 'true',  
OWNER_REACT: 'false',  
OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],  
REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],  
  
// Bot Identity  
BOT_NAME: 'NAWAZ-MD',  
OWNER_NAME: 'NAWAZ-MD',  
OWNER_NUMBER: '923067103522',  
DEV: '923067103522',  
IK_IMAGE_PATH: './lib/bot.png',  
BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',  
  
// Newsletter Configuration  
NEWSLETTER_JID: '120363426829681935@newsletter',  
NEWSLETTER_MESSAGE_ID: '428',   
  
KHAN: [

"120363426829681935@newsletter",
"120363408914850955@newsletter",
"120363427782944143@newsletter",
"120363434585705138@newsletter",
"120363410492961552@newsletter",
"120363409104273154@newsletter",
"120363412400560245@newsletter",
"120363427597240355@newsletter",
"120363410129201712@newsletter"
],

// System Configuration  
MAX_RETRIES: 3,  
OTP_EXPIRY: 300000,  
BANNED: [],  
MENTION_REPLY: 'false',  // Added MENTION_REPLY config  
  
// Updated SUDO with new numbers (removed all old ones)  
SUDO: [  
    "923067103522@s.whatsapp.net",  
    "923067103522@s.whatsapp.net"  
],  
  
// Default Settings Template  
DEFAULT_SETTINGS: {  
    // Status & View Settings  
    AUTO_VIEW_STATUS: 'true',  
    AUTO_STATUS_SEEN: 'true',  
    READ_MESSAGE: 'false',  
      
    // Auto Actions  
    AUTO_RECORDING: 'false',  
    AUTO_REACT: 'false',  
    AUTO_TYPING: 'false',  
    ALWAYS_ONLINE: 'false',  
    OWNER_REACT: 'false',  
      
    // Anti Features  
    ANTI_DELETE: 'false',  
    ANTI_DELETE_PATH: 'inbox',  
    ANTI_EDIT: 'false',  
    ANTI_EDIT_PATH: 'inbox',  
    ANTI_CALL: 'false',  
    ANTI_LINK: 'true',  
      
    // Group Events  
    WELCOME: 'false',  
    GOODBYE: 'false',  
    ADMIN_ACTION: 'false',  
      
    // Message Templates  
    WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',  
    GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',  
    REJECT_MSG: '*Call Rejected Automatically 📵*',  
      
    // Bot Identity  
    VERSION: '5.0.0 Bᴇᴛᴀ',  
    OWNER_NAME: 'NAWAZ-MD',  
    OWNER_NUMBER: '923067103522',  
    DEV: '923067103522',  
    DESCRIPTION: '*© POWER BY NawazTechX *',  
    STICKER_NAME: 'NAWAZ-MD',  
    MODE: 'public',  
    PREFIX: '.',  
    BOT_NAME: 'NAWAZ-MD',  
    BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',  
      
    REACT_EMOJIS: ['♥️', '❤️', '🌹', '💘', '💞', '😘', '💕', '💖', '🎉', '🤔',  '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],  
    OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],  
      
    // MENTION_REPLY in default settings  
    MENTION_REPLY: 'false',  
      
    // Newsletter channels for per-bot config  
    NEWSLETTER_JIDS: [ "120363426829681935@newsletter" ],  
    FOLLOW_CHANNEL_JIDS: [ "120363426829681935@newsletter" ],  
      
    // Lists (only new sudo numbers)  
    BANNED: [],  
    SUDO: [  
        "923067103522@s.whatsapp.net",  
        "923067103522@s.whatsapp.net"  
    ]  
}

};

module.exports = config;
