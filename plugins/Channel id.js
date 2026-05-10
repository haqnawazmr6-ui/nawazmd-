const { cmd } = require('../command')

cmd({
    pattern: "id",
    alias: ["newsletterid","channelid"],
    desc: "Get Newsletter JID From Channel Link",
    category: "owner",
    react: "🆔",
    filename: __filename
},
async(conn, mek, m, { q, reply }) => {

try {

if (!q) {
return reply("*❌ Example:* .id https://whatsapp.com/channel/xxxxx")
}

// Clean Link
const link = q.trim()

// Extract Invite Code
const code = link.split('/').pop()

if (!code) {
return reply("*❌ Invalid Channel Link*")
}

// Get Newsletter Info
const data = await conn.newsletterMetadata("invite", code)

if (!data || !data.id) {
return reply("*❌ Channel Not Found*")
}

// Send Result
await conn.sendMessage(m.chat, {
text: `╭━━━〔 *NEWSLETTER INFO* 〕━━━⊷
┃📢 *Name:* ${data.name}
┃🆔 *JID:* ${data.id}
┃👥 *Followers:* ${data.subscribers || "Unknown"}
╰━━━━━━━━━━━━━━━━━━⊷`,

contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: '120363402493709861@newsletter',
newsletterName: 'NAWAZ MD',
serverMessageId: 143
}
}

}, { quoted: mek })

} catch (e) {

console.log(e)

reply("*❌ Failed To Get Newsletter ID*")

}

})
