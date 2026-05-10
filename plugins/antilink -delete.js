//═══════════════════════════════════════════════
// ⚠️ ANTI LINK WARNING SYSTEM - NAWAZ MD
//═══════════════════════════════════════════════

const { cmd } = require('../command')

const warnings = {}

cmd({
    on: "body"
},
async (conn, mek, m, { from, sender, isGroup, groupMetadata }) => {

    try {

        if (!isGroup) return

        const msg = m.body || m.text || ""

        // 🔗 Link Detect
        const isLink = msg.match(/(https?:\/\/|www\.|chat\.whatsapp\.com|t\.me|youtube\.com|youtu\.be)/gi)

        if (!isLink) return

        // 👑 Admin Check
        const groupAdmins = groupMetadata.participants
            .filter(v => v.admin !== null)
            .map(v => v.id)

        const isAdmin = groupAdmins.includes(sender)

        // 🤖 Bot Admin Check
        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
        const isBotAdmin = groupAdmins.includes(botNumber)

        if (isAdmin) return
        if (!isBotAdmin) return

        // ⚠️ Warning Count
        if (!warnings[sender]) warnings[sender] = 0

        warnings[sender] += 1

        const warnCount = warnings[sender]

        // 1st Warning
        if (warnCount === 1) {

            await conn.sendMessage(from, {
                text:
`⚠️ *WARNING 1/3*

🚫 @${sender.split("@")[0]}

Group me links send karna mana hai.

Next warning pe remove kar diya jayega.`,
                mentions: [sender]
            }, { quoted: mek })

        }

        // 2nd Warning
        else if (warnCount === 2) {

            await conn.sendMessage(from, {
                text:
`⚠️ *WARNING 2/3*

🚫 @${sender.split("@")[0]}

Ye aapki second warning hai.

Agar dobara link bheja to group se remove kar diya jayega.`,
                mentions: [sender]
            }, { quoted: mek })

        }

        // 3rd Warning = Remove
        else if (warnCount >= 3) {

            await conn.sendMessage(from, {
                text:
`❌ *USER REMOVED*

🚫 @${sender.split("@")[0]}

3 warnings complete hone par user remove kar diya gaya.`,
                mentions: [sender]
            }, { quoted: mek })

            await conn.groupParticipantsUpdate(
                from,
                [sender],
                "remove"
            )

            delete warnings[sender]
        }

    } catch (e) {
        console.log(e)
    }
})
