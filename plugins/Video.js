const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')

cmd({
    pattern: "video",
    alias: ["ytv", "mp4"],
    desc: "Download Youtube Video",
    category: "download",
    react: "🎬",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {

try {

if (!q) return reply("*❌ Give Me Video Name*")

// Search Video
const search = await yts(q)
const data = search.videos[0]

if (!data) return reply("*❌ Video Not Found*")

await reply("*⬇️ Downloading Video...*")

// API
const api = `https://api.giftedtech.web.id/api/download/ytdl?apikey=gifted&url=${data.url}`

const res = await axios.get(api)
const dl = res.data.result.download_url

// Send Video With Newsletter Forward
await conn.sendMessage(from, {
    video: { url: dl },
    mimetype: 'video/mp4',
    caption: `╭━━━〔 *YOUTUBE VIDEO* 〕━━━⊷
┃🎬 *Title:* ${data.title}
┃⏱️ *Duration:* ${data.timestamp}
┃👀 *Views:* ${data.views}
┃📺 *Channel:* ${data.author.name}
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
reply("*❌ Video Download Failed*")

}

})
