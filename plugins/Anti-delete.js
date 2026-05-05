const { cmd } = require('../command');

cmd({
    pattern: "del",
    desc: "Delete replied message",
    category: "admin",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins }) => {

    if (!isGroup) return m.reply("❌ This command works only in groups");

    if (!isAdmins) return m.reply("❌ You must be admin");

    if (!isBotAdmins) return m.reply("❌ Bot must be admin");

    if (!m.quoted) return m.reply("❌ Reply to a message to delete");

    try {
        await conn.sendMessage(from, {
            delete: m.quoted.key
        });

    } catch (e) {
        console.log(e);
        m.reply("❌ Failed to delete message");
    }
});
