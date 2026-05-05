const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "sexy",
    desc: "Flirty + audio vibe 😏",
    category: "fun",
    react: "😏"
}, async (conn, mek, m, { reply }) => {

    try {

        const lines = [
            "تمہاری vibe کچھ زیادہ ہی attractive ہے 😏",
            "آج تم کافی dangerous لگ رہے ہو 🔥",
            "دل کر رہا ہے تم سے بات ہی کرتے رہیں 😉",
            "تمہاری smile دل کو hit کر گئی 💘",
            "اتنے cute بھی نہ بنو، لوگ jealous ہو جائیں گے 😌",
            "تم online آتے ہو تو mood automatically set ہو جاتا ہے 😍"
        ];

        const random = lines[Math.floor(Math.random() * lines.length)];

        // Text
        await conn.sendMessage(m.chat, {
            text: random
        }, { quoted: mek });

        // Audio (already added)
        await conn.sendMessage(m.chat, {
            audio: { url: "https://files.catbox.moe/8lqz9p.mp3" },
            mimetype: "audio/mpeg",
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("Error aya 😢");
    }

});
