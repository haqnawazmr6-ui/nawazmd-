// Credits NawazTechX - Nawaz-MD 💜 (Refactored)

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');
const { lidToPhone } = require('./functions');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// ❌ Removed profile picture logic completely

// Simple text sender ONLY (no image / DP)
const sendTextOnly = async (conn, jid, userJid, text) => {
    return conn.sendMessage(jid, {
        text,
        mentions: [userJid]
    });
};

const GroupEvents = async (conn, update) => {
    try {
        if (!update?.id || !isJidGroup(update.id)) return;
        if (!Array.isArray(update.participants) || !update.participants.length) return;

        const userConfig = conn.userConfig || config.DEFAULT_SETTINGS;

        let metadata;
        try {
            metadata = await conn.groupMetadata(update.id);
        } catch (err) {
            if (err.message?.includes('429') || err.message?.includes('rate-overlimit')) return;
            console.error('Metadata error:', err.message);
            return;
        }

        const desc = metadata?.desc || "No Description";
        const groupCount = metadata?.participants?.length || 0;
        const time = new Date().toLocaleString();

        for (const user of update.participants) {
            if (!user) continue;

            const lid = user.id || user;

            let userName;
            try {
                const pn = await lidToPhone(conn, lid);
                userName = pn || lid.split('@')[0] || "unknown";
            } catch {
                userName = lid.split('@')[0] || "unknown";
            }

            const baseMsg = (template) =>
                template
                    ?.replace(/@user/g, `@${userName}`)
                    ?.replace(/@group/g, metadata.subject || "Group")
                    ?.replace(/@desc/g, desc)
                    ?.replace(/@count/g, groupCount)
                    ?.replace(/@bot/g, userConfig.BOT_NAME || "Bot")
                    ?.replace(/@time/g, time);

            try {
                switch (update.action) {

                    case "add":
                        if (userConfig.WELCOME !== "true") break;

                        await sendTextOnly(
                            conn,
                            update.id,
                            lid,
                            baseMsg(userConfig.WELCOME_MESSAGE || config.WELCOME_MESSAGE)
                        );
                        await delay(1000);
                        break;

                    case "remove":
                        if (userConfig.GOODBYE !== "true") break;

                        await sendTextOnly(
                            conn,
                            update.id,
                            lid,
                            baseMsg(userConfig.GOODBYE_MESSAGE || config.GOODBYE_MESSAGE)
                        );
                        await delay(1000);
                        break;

                    case "promote":
                    case "demote":
                        if (userConfig.ADMIN_ACTION !== "true") break;

                        if (!update.author) break;

                        let authorName;
                        try {
                            const pn = await lidToPhone(conn, update.author);
                            authorName = pn || update.author.split('@')[0];
                        } catch {
                            authorName = update.author.split('@')[0];
                        }

                        await conn.sendMessage(update.id, {
                            text: `@${authorName} ${update.action} @${userName}`,
                            mentions: [update.author, lid]
                        });

                        await delay(500);
                        break;
                }
            } catch (err) {
                if (!err.message?.includes('429')) {
                    console.error(`Group event error (${update.action}):`, err.message);
                }
            }
        }

    } catch (err) {
        if (!err.message?.includes('429')) {
            console.error('Fatal group event error:', err.message);
        }
    }
};

module.exports = GroupEvents;
