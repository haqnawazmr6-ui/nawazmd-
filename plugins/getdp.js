const { cmd } = require('../command')

cmd({
    pattern: "getdp",
    desc: "Get anyone profile picture",
    category: "tools",
    react: "🖼️",
    filename: __filename
},
async(conn, mek, m, { q, reply }) => {

try {

if (!q) {
return reply("*Example:* .getdp 92300xxxxxx")
}

let number = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net"

let pp = await conn.profilePictureUrl(number, 'image')

await conn.sendMessage(m.chat, {
image: { url: pp },
caption: `*✅ Profile Picture Fetched*\n\n*Number:* ${q}`
}, {
quoted: mek,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363402493709861@newsletter",
newsletterName: "NAWAZ MD",
serverMessageId: 143
}
}
})

} catch (e) {

console.log(e)

reply("*❌ Profile picture not found or privacy is private.*")

}

})
