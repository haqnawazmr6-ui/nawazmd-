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
    VERSION: '3.0.0 Bᴇᴛᴀ',
    DESCRIPTION: '*© POWERED BY NAWAZTECHX*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    ANTI_EDIT_PATH: 'inbox',
    ANTI_EDIT: 'false',
    STICKER_NAME: 'Nawaz-MD',
    ANTI_LINK: 'true',
    WELCOME: 'true',
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
    BOT_NAME: '🄽🄰🅆🅀🅉 🄼🄳',
    OWNER_NAME: 'ᏁᎪᎳᎪᏃ⊘',
    OWNER_NUMBER: '923161483125',
    DEV: '923161483125',
    IK_IMAGE_PATH: './lib/bot.png',
    BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',
    
    // Newsletter Configuration
    NEWSLETTER_JID: '120363428226854595@newsletter',
    NEWSLETTER_MESSAGE_ID: '428', 
    
    KHAN: [ 
        "120363402493709861@newsletter",
        "120363426204760289@newsletter",
        "120363408907671996@newsletter",
        "120363408033902681@newsletter",
        "120363409120319589@newsletter",
        
        // NEW ADDED NEWSLETTER SLOT
        "120363409038994674@newsletter"
    ],
    
    
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    BANNED: [],
    MENTION_REPLY: 'false',
    
    // Updated SUDO with new numbers (removed all old ones)
    SUDO: [
        "923161483125@s.whatsapp.net",
        "923161483125@s.whatsapp.net"
    ],
    
    // Default Settings Template
    DEFAULT_SETTINGS: {
        AUTO_VIEW_STATUS: 'true',
        AUTO_STATUS_SEEN: 'true',
        READ_MESSAGE: 'false',
        
        AUTO_RECORDING: 'false',
        AUTO_REACT: 'false',
        AUTO_TYPING: 'false',
        ALWAYS_ONLINE: 'false',
        OWNER_REACT: 'false',
        
        ANTI_DELETE: 'false',
        ANTI_DELETE_PATH: 'inbox',
        ANTI_EDIT: 'false',
        ANTI_EDIT_PATH: 'inbox',
        ANTI_CALL: 'false',
        ANTI_LINK: 'true',
        
        WELCOME: 'true',
        GOODBYE: 'false',
        ADMIN_ACTION: 'false',
        
        WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',
        GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',
        REJECT_MSG: '*Call Rejected Automatically 📵*',
        
        VERSION: '2.0.0 Bᴇᴛᴀ',
        OWNER_NAME: 'ᏁᎪᎳᎪᏃ⊘',
        OWNER_NUMBER: '923161483125',
        DEV: '923161483125',
        DESCRIPTION: '*© POWER BY NawazTechX *',
        STICKER_NAME: 'NAWAZ-MD',
        MODE: 'public',
        PREFIX: '.',
        BOT_NAME: '🄽🄰🅆🅀🅉 🄼🄳',
        BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',
        
        REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
        
        MENTION_REPLY: 'false',
        
        // Newsletter channels for per-bot config
        NEWSLETTER_JIDS: [
            "120363428226854595@newsletter"
        ],
        
        FOLLOW_CHANNEL_JIDS: [
            "120363428226854595@newsletter"
        ],
        
        // ADDED NEW SLOT ONLY
        EXTRA_NEWSLETTER_JID: "120363409038994674@newsletter",
        
        BANNED: [],
        SUDO: [
            "923161483125@s.whatsapp.net",
            "923161483125@s.whatsapp.net"
        ]
    }
};

module.exports = config;
