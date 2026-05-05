// config.js - Centralized configuration 
require('dotenv').config();

const config = {
    // MongoDB Configuration (from process.env)
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://jawadmd:irfanmd@cluster0.cqcxhti.mongodb.net/?appName=Cluster0',
    
    // Database Name from process.env
    DB_NAME: process.env.DB_NAME || 'nawaz-x10',
    
    // Collections Configuration
    COLLECTIONS: {
        SESSIONS: 'whatsapp_sessions',
        NUMBERS: 'active_numbers',
        CONFIGS: 'bot_configs'
    },
    
    // Bot Configuration
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'true',
    AUTO_RECORDING: 'false',
    AUTO_REACT: 'true',
    AUTO_TYPING: 'false',
    ALWAYS_ONLINE: 'false',
    VERSION: '1.1.0 Bᴇᴛᴀ',
    DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴀᴡᴀᴢ ᴛᴇᴄʜ*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    STICKER_NAME: 'ꪀꪖ᭙ꪖɀ',
    ANTI_LINK: 'true',
    WELCOME: 'true',
    ADMIN_ACTION: 'true',
    MODE: 'public',
    PREFIX: '.',
    
    // Bot Identity
    BOT_NAME: 'ᏁᎪᎳᎪᏃ-ᎷᎠ',
    OWNER_NAME: 'ꪀꪖ᭙ꪖɀ',
    OWNER_NUMBER: '923067103522',
    DEV: '923067103522',
    IK_IMAGE_PATH: './lib/nawaz.jpg',
    BOT_IMAGE: 'https://files.catbox.moe/0jijco.jpg ',
    
    // Newsletter Configuration
    NEWSLETTER_JID: '120363402493709861@newsletter',
    NEWSLETTER_MESSAGE_ID: '428',
    
    // Reaction Emojis
    AUTO_LIKE_EMOJI: ['❤️', '💚', '🌚', '😍', '💀', '🧡', '💛', '💙', '👻', '🖤', '🤍', '🥀'],
    REACTXEMOJIS: ['♥️', '❤️', '🔥', '❣️', '💗', '❤️', '💗', '🤎', '💘', '🤎', '🧡', '🤎', '💌', '🥰', '💕', '🤩', '✨', '😎', '🥳', '👑'],
    
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    ADMIN_LIST_PATH: './admin.json',

    // Default Settings Template
    DEFAULT_SETTINGS: {
        AUTO_VIEW_STATUS: 'true',
        AUTO_LIKE_STATUS: 'true',
        AUTO_RECORDING: 'false',
        AUTO_REACT: 'true',
        AUTO_TYPING: 'false',
        ALWAYS_ONLINE: 'false',
        VERSION: '1.1.0 Bᴇᴛᴀ',        
        OWNER_NAME: 'ꪀꪖ᭙ꪖɀ',
        ANTI_DELETE_PATH: 'inbox',
        OWNER_NUMBER: '923067103522',
        DEV: '923067103522',
        DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴀᴡᴀᴢ ᴛᴇᴄʜ*',
        ANTI_DELETE: 'true',
        ANTI_LINK: 'true',
        STICKER_NAME: '𝐍𝆭𝛂𝆭Ꮿ𝆭𝛂ʑ̽-𝐌𝛛͎ ',
        WELCOME: 'true',
        ADMIN_ACTION: 'true',
        MODE: 'public',
        PREFIX: '.',
        BOT_IMAGE: 'https://files.catbox.moe/0jijco.jpg ',
        AUTO_LIKE_EMOJI: ['❤️', '💚', '🌚', '😍', '💀', '🧡', '💛', '💙', '👻', '🖤', '🤍', '🥀'],
        REACTXEMOJIS: ['❣️', '❤️', '🔥', '💌', '💝', '💛', '💞', '💚', '💛', '🖤', '❤️', '🤍', '☑️', '🥰', '💕', '🤩', '✨', '😎', '💙', '💝']
    }  // ← Added missing closing brace here
};

module.exports = config;
