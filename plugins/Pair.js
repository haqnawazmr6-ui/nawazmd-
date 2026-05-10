const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "pair",
    alias: ["code","paircode"],
    desc: "Generate Pairing Code",
    category: "owner",
    react: "📲",
    filename: __filename
},
async(conn, mek, m, { q, reply }) => {

try {

if (!q) {
return reply("*❌ Example:* .pair 923001234567")
}

let number = q.replace(/[^0-9]/g, '')

await reply("*⏳ Generating Pair Code...*")

// Request To Your Server
const res = await axios.get(`https://nawazmdserver5-36fc93b19fc0.herokuapp.com/code?number=${number}`)

const code =
res.data.code ||
res.data.pair ||
res.data.pairingCode ||
res.data.result ||
"Not Found"

// Send Pair Code
await conn.sendMessage(m.chat, {
text: `╭━━━〔 *PAIR CODE* 〕━━━⊷
┃📱 *Number:* ${number}
┃🔑 *Code:* ${code}
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

reply("*❌ Pair Code Failed*\n*Server API Route May Be Different*")

}

})
