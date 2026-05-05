const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "play",
    desc: "Play song with buttons",
    category: "media",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {

    if (!q) return reply("❌ Song name likho!\nExample: .play kesariya");

    try {
        // API (example)
        let res = await fetch(`https://api.giftedtech.web.id/api/search/ytsearch?apikey=gifted&q=${q}`);
        let data = await res.json();

        let vid = data.result[0];

        let caption = `🎵 *${vid.title}*
⏱️ ${vid.duration}
👀 ${vid.views}

Select option below 👇`;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: caption,
            footer: "Play System",
            buttons: [
                {
                    buttonId: `.audio ${vid.url}`,
                    buttonText: { displayText: "🎧 Audio" },
                    type: 1
                },
                {
                    buttonId: `.video ${vid.url}`,
                    buttonText: { displayText: "🎥 Video" },
                    type: 1
                },
                {
                    buttonId: `.mix ${vid.url}`,
                    buttonText: { displayText: "🔥 Mix" },
                    type: 1
                }
            ],
            headerType: 4
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error aya!");
    }
});


// 🎧 AUDIO COMMAND
cmd({
    pattern: "audio",
    dontAddCommandList: true
}, async (conn, m, mek, { from, q }) => {

    let res = await fetch(`https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=${q}`);
    let data = await res.json();

    await conn.sendMessage(from, {
        audio: { url: data.result.download_url },
        mimetype: "audio/mpeg"
    }, { quoted: mek });
});


// 🎥 VIDEO COMMAND
cmd({
    pattern: "video",
    dontAddCommandList: true
}, async (conn, m, mek, { from, q }) => {

    let res = await fetch(`https://api.giftedtech.web.id/api/download/ytmp4?apikey=gifted&url=${q}`);
    let data = await res.json();

    await conn.sendMessage(from, {
        video: { url: data.result.download_url },
        caption: "🎥 Here is your video"
    }, { quoted: mek });
});


// 🔥 MIX COMMAND
cmd({
    pattern: "mix",
    dontAddCommandList: true
}, async (conn, m, mek, { from, q }) => {

    let res1 = await fetch(`https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=${q}`);
    let a = await res1.json();

    let res2 = await fetch(`https://api.giftedtech.web.id/api/download/ytmp4?apikey=gifted&url=${q}`);
    let v = await res2.json();

    await conn.sendMessage(from, {
        text: "🔥 Audio + Video ready!",
        buttons: [
            {
                buttonId: `.sendaudio ${a.result.download_url}`,
                buttonText: { displayText: "🎧 Get Audio" },
                type: 1
            },
            {
                buttonId: `.sendvideo ${v.result.download_url}`,
                buttonText: { displayText: "🎥 Get Video" },
                type: 1
            }
        ],
        headerType: 1
    }, { quoted: mek });
});


// FINAL SEND
cmd({
    pattern: "sendaudio",
    dontAddCommandList: true
}, async (conn, m, mek, { from, q }) => {
    await conn.sendMessage(from, {
        audio: { url: q },
        mimetype: "audio/mpeg"
    }, { quoted: mek });
});

cmd({
    pattern: "sendvideo",
    dontAddCommandList: true
}, async (conn, m, mek, { from, q }) => {
    await conn.sendMessage(from, {
        video: { url: q }
    }, { quoted: mek });
});
