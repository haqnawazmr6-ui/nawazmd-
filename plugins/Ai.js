const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    desc: "AI Chat Bot",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { reply, q }) => {

    if (!q) {
        return reply("❌ Example:\n.ai Hello");
    }

    try {

        await reply("🤖 AI is thinking...");

        // FREE API
        const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(q)}&owner=Nawaz&botname=NAWAZ-MD`);

        const ai = res.data.response;

        await conn.sendMessage(
            m.chat,
            {
                text: `╭━━〔 🤖 AI CHAT 🤖 〕━━⬣
┃
┃ 🗨️ Question:
┃ ${q}
┃
┃ 🤖 Reply:
┃ ${ai}
┃
╰━━━━━━━━━━━━━━⬣`
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);

        reply("❌ AI Error, try again later.");
    }

});
