// lib/index.js

// KHAN-MD 

const { 
    saveContact,
    loadMessage,
    getName,
    getChatSummary,
    saveGroupMetadata,
    getGroupMetadata,
    saveMessageCount,
    getInactiveGroupMembers,
    getGroupMembersMessageCount,
    saveMessage,
    cleaner
} = require('./store');

// Import other functions from lib/functions.js
const {
    getBuffer,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
} = require('./functions');

// Import msg functions from lib/msg.js
const { sms, downloadMediaMessage } = require('./msg');


// Export everything
module.exports = {
    // Store functions
    saveContact,
    loadMessage,
    getName,
    getChatSummary,
    saveGroupMetadata,
    getGroupMetadata,
    saveMessageCount,
    getInactiveGroupMembers,
    getGroupMembersMessageCount,
    saveMessage,
    cleaner,
    getBuffer,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
    sms,
    downloadMediaMessage
};
