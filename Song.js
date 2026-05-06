const yts = require('yt-search');
const ytdl = require('ytdl-core');

cmd({
    pattern: "song",
    desc: "Download song with buttons",
    category: "media",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    if (!q) return reply("❌ Please give song name\nExample: .song Faded");

    try {
        // 🔍 Search Song
        const search = await yts(q);
        const video = search.videos[0];

        if (!video) return reply("❌ Song not found!");

        let text = `🎵 *SONG FOUND*\n\n` +
                   `📌 Title: ${video.title}\n` +
                   `⏱ Duration: ${video.timestamp}\n` +
                   `👀 Views: ${video.views}\n` +
                   `🔗 URL: ${video.url}\n\n` +
                   `⬇️ Choose format below`;

        // 📌 Send Buttons
        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption: text,
            buttons: [
                { buttonId: `.audio ${video.url}`, buttonText: { displayText: "🎧 Audio" }, type: 1 },
                { buttonId: `.video ${video.url}`, buttonText: { displayText: "🎥 Video" }, type: 1 }
            ],
            headerType: 4
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error occurred");
    }
});
