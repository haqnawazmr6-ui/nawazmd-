const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')

// ═══════════════════════════════════════════════════════════
// 🎵 SONG COMMAND - NAWAZ MD
// ═══════════════════════════════════════════════════════════

cmd({
    pattern: "song",
    alias: ["play", "music", "audio", "aa"],
    desc: "Download YouTube song",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {

    try {

        if (!text) {
            return reply("❌ Please provide song name\n\nExample: .song Shape of You")
        }

        // 🔍 YouTube Search
        const search = await yts(text)

        if (!search.videos || !search.videos.length) {
            return reply("❌ No song found!")
        }

        const vid = search.videos[0]

        // 🌟 Stylish Caption
        const caption = `
╔═══━━━─── • ───━━━═══╗
        🎵 *NAWAZ - MD*
╚═══━━━─── • ───━━━═══╝

╭──────────────◆
│ 🎧 *Title* : ${vid.title}
│ ⏰ *Duration* : ${vid.timestamp}
│ 👀 *Views* : ${vid.views}
│ 📀 *Quality* : 128kbps
│ 📁 *Format* : mp3
│ ⚡ *Status* : Downloading
╰──────────────◆

╭━━〔 ✨ *MUSIC SYSTEM* ✨ 〕━━⬣
┃
┃ 🎶 Your song is ready
┃ 🚀 Powered By NAWAZ-MD
┃ 💫 Enjoy High Quality Music
┃
╰━━━━━━━━━━━━━━━━━━⬣

> 🌸 NAWAZ TECH 🇵🇰
`

        // 🖼️ Send Thumbnail
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363402493709861@newsletter",
                    newsletterName: "NAWAZ TECH 🇵🇰",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })

        // 🎵 API Request
        const apiUrl = `https://eliteprotech-apis.zone.id/ytmp3?url=${encodeURIComponent(vid.url)}`

        const res = await axios.get(apiUrl, {
            timeout: 30000
        })

        // ❌ API Check
        if (!res.data?.status || !res.data?.result?.download) {

            await conn.sendMessage(from, {
                react: {
                    text: '❌',
                    key: m.key
                }
            })

            return reply("❌ API Error! Please try again later.")
        }

        const audioUrl = res.data.result.download

        // 🎧 Send Audio
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`,
            ptt: false,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363402493709861@newsletter",
                    newsletterName: "NAWAZ TECH 🇵🇰",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek })

        // ✅ React
        await conn.sendMessage(from, {
            react: {
                text: '✅',
                key: m.key
            }
        })

        console.log("✅ Song sent successfully!")

    } catch (err) {

        console.error("❌ SONG ERROR:", err)

        await conn.sendMessage(from, {
            react: {
                text: '❌',
                key: m.key
            }
        })

        reply("❌ API Error! Please try again later.")
    }
})
