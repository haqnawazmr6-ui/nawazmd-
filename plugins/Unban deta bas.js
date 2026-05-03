const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "unban",
    desc: "Get WhatsApp Unban Info",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {

    if (!args[0]) {
        return reply("❌ Example:\n.unban 923087069523");
    }

    const number = args[0];

    try {
        const res = await axios.get(`http://localhost:3000/wa-unban?number=${number}`);
        const data = res.data;

        let msg = `📢 *WA UNBAN REQUEST*\n\n`;
        msg += `📱 Number: +${data.number}\n\n`;
        msg += `🔗 Link: ${data.unban_link}\n\n`;
        msg += `📝 Message:\n${data.message}`;

        reply(msg);

    } catch (err) {
        reply("❌ API Error!");
    }
});
