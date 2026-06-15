// Credits NawazTechX - Nawaz-MD 💜 (Refactored)

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

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

            const jidUser = user.id || user;

            const baseMsg = (template) =>
                template
                    ?.replace(/@user/g, `@${jidUser.split('@')[0]}`)
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
                            jidUser,
                            baseMsg(userConfig.WELCOME_MESSAGE || config.WELCOME_MESSAGE)
                        );

                        await delay(1000);
                        break;

                    case "remove":
                        if (userConfig.GOODBYE !== "true") break;

                        await sendTextOnly(
                            conn,
                            update.id,
                            jidUser,
                            baseMsg(userConfig.GOODBYE_MESSAGE || config.GOODBYE_MESSAGE)
                        );

                        await delay(1000);
                        break;

                    case "promote":
                        if (userConfig.ADMIN_ACTION !== "true") break;
                        if (!update.author) break;

                        await conn.sendMessage(update.id, {
                            text: `╭─❖
│ 👑 ADMIN UPDATE
│
│ 👤 @${update.author.split('@')[0]}
│ ➜ promoted
│ 👤 @${jidUser.split('@')[0]}
│ ➜ to admin
╰────────────❖`,
                            mentions: [update.author, jidUser]
                        });

                        await delay(500);
                        break;

                    case "demote":
                        if (userConfig.ADMIN_ACTION !== "true") break;
                        if (!update.author) break;

                        await conn.sendMessage(update.id, {
                            text: `╭─❖
│ ❌ ADMIN UPDATE
│
│ 👤 @${update.author.split('@')[0]}
│ ➜ removed
│ 👤 @${jidUser.split('@')[0]}
│ ➜ from admin
╰────────────❖`,
                            mentions: [update.author, jidUser]
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
