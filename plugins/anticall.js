const config = require('../config');
const { cmd } = require('../command');

let antiCallEnabled = true;

cmd({
    pattern: "anticall",
    alias: ["callblock"],
    desc: "Enable/Disable Anti Call",
    category: "owner",
    react: "📵",
    filename: __filename
},
async(conn, mek, m, { args, isOwner, reply }) => {

    if (!isOwner) return reply("*Owner Only Command ❌*");

    if (!args[0]) {
        return reply(
`📵 *ANTI CALL SETTINGS*

Example:
.anticall on
.anticall off`
        );
    }

    if (args[0] === "on") {
        antiCallEnabled = true;
        return reply("✅ Anti Call Enabled");
    }

    if (args[0] === "off") {
        antiCallEnabled = false;
        return reply("❌ Anti Call Disabled");
    }

    reply("Use .anticall on/off");
});

module.exports = {
    antiCallEnabled
};

// AUTO REJECT CALL
// نیچے والا پارٹ main.js یا index.js میں لگاؤ

conn.ev.on('call', async (calls) => {
    if (!antiCallEnabled) return;

    for (const call of calls) {
        await conn.rejectCall(call.id, call.from);

        await conn.sendMessage(call.from, {
            text: `📵 *CALLS ARE NOT ALLOWED*\n\n❌ pawer by NAWAZ-MD`
        });
    }
});
