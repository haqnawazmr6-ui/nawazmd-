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
    AUTO_VIEW_STATUS: 'false',
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

    // ✅ UPDATED WELCOME MESSAGE
    WELCOME_MESSAGE: `🎉 @user joined the group, welcome! ✨

⚡ Powered By Nawaz MD`,

    GOODBYE_MESSAGE: `👋 @user left the group, goodbye!

⚡ Powered By Nawaz MD`,

    ADMIN_ACTION: 'true',
    MODE: 'public',
    PREFIX: '.',
    ANTI_CALL: 'false',
    REJECT_MSG: '*Call Rejected power by Nawaz MD📵*',
    READ_MESSAGE: 'false',
    AUTO_STATUS_SEEN: 'false',
    OWNER_REACT: 'false',
    OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
    REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
    
    // Bot Identity
    BOT_NAME: '🄽🄰🅆🄰🅉 🄼🄳',
    OWNER_NAME: 'ᏁᎪᎳᎪᏃ',
    OWNER_NUMBER: '923161483125',
    DEV: '923161483125',
    IK_IMAGE_PATH: './lib/bot.png',
    BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',
    
    // Newsletter Configuration
    NEWSLETTER_JID: '120363426829681935@newsletter',
    NEWSLETTER_MESSAGE_ID: '428', 
    
    KHAN: [ 
        "120363426829681935@newsletter",
        "120363409104273154@newsletter",
        "120363428090969358@newsletter",
        "120363409066886564@newsletter",
        "120363426105683262@newsletter",
        "120363427024843690@newsletter",
        "120363427597240355@newsletter",
        "120363410129201712@newsletter",
        "120363410520556406@newsletter"
    ],
    
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    BANNED: [],
    MENTION_REPLY: 'false',
    
    SUDO: [
        "923161483125@s.whatsapp.net",
        "923161483125@s.whatsapp.net"
    ],
    
    DEFAULT_SETTINGS: {
        AUTO_VIEW_STATUS: 'false',
        AUTO_STATUS_SEEN: 'false',
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
        ADMIN_ACTION: 'true',
        
        // SAME STYLE INSIDE DEFAULT ALSO
        WELCOME_MESSAGE: `🎉 @user joined the group, welcome! ✨

⚡ Powered By Nawaz MD`,

        GOODBYE_MESSAGE: `👋 @user left the group, goodbye!

⚡ Powered By Nawaz MD`,

        REJECT_MSG: '*Call Rejected power by Nawaz MD 📵*',
        
        VERSION: '3.0.0 Bᴇᴛᴀ',
        OWNER_NAME: 'ᏁᎪᎳᎪᏃ',
        OWNER_NUMBER: '923161483125',
        DEV: '923161483125',
        DESCRIPTION: '*© POWER BY NawazTechX *',
        STICKER_NAME: 'NAWAZ-MD',
        MODE: 'public',
        PREFIX: '.',
        BOT_NAME: '🄽🄰🅆🄰🅉 🄼🄳',
        BOT_IMAGE: 'https://files.catbox.moe/f2qbux.png',
        
        REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
        
        MENTION_REPLY: 'false',
        
        NEWSLETTER_JIDS: [
            "120363426829681935@newsletter",
            "120363409104273154@newsletter",
            "120363428090969358@newsletter",
            "120363409066886564@newsletter",
            "120363426105683262@newsletter",
            "120363427024843690@newsletter",
            "120363427597240355@newsletter",
            "120363410129201712@newsletter",
            "120363410520556406@newsletter"
        ],
        
        FOLLOW_CHANNEL_JIDS: [
            "120363426829681935@newsletter",
            "120363409104273154@newsletter",
            "120363428090969358@newsletter",
            "120363409066886564@newsletter",
            "120363426105683262@newsletter",
            "120363427024843690@newsletter",
            "120363427597240355@newsletter",
            "120363410129201712@newsletter",
            "120363410520556406@newsletter"
        ],
        
        EXTRA_NEWSLETTER_JID: "120363426829681935@newsletter",
        
        BANNED: [],
        SUDO: [
            "923161483125@s.whatsapp.net",
            "923161483125@s.whatsapp.net"
        ]
    }
};

module.exports = config;
