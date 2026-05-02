

const axios = require("axios");
const ytdl = require("ytdl-core");
const { cmd } = require("../command");

// 🎨 Fancy Font Function
const fancy = (text) => {
  return text
    .replace(/a/g, "ᴀ").replace(/b/g, "ʙ").replace(/c/g, "ᴄ")
    .replace(/d/g, "ᴅ").replace(/e/g, "ᴇ").replace(/f/g, "ғ")
    .replace(/g/g, "ɢ").replace(/h/g, "ʜ").replace(/i/g, "ɪ")
    .replace(/j/g, "ᴊ").replace(/k/g, "ᴋ").replace(/l/g, "ʟ")
    .replace(/m/g, "ᴍ").replace(/n/g, "ɴ").replace(/o/g, "ᴏ")
    .replace(/p/g, "ᴘ").replace(/q/g, "ǫ").replace(/r/g, "ʀ")
    .replace(/s/g, "s").replace(/t/g, "ᴛ").replace(/u/g, "ᴜ")
    .replace(/v/g, "ᴠ").replace(/w/g, "ᴡ").replace(/x/g, "x")
    .replace(/y/g, "ʏ").replace(/z/g, "ᴢ");
};

cmd({
  pattern: "menu",
  desc: "menu with audio",
  category: "main",
  react: "🎵",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {

  try {

    // 🎵 YouTube Video Link
    let videoUrl = "https://www.youtube.com/watch?v=ey1WXW-_Eag";

    // 🎧 Get Audio Stream
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
    const audioUrl = format.url;

    // 🔊 Send Audio (NOT video)
    await conn.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: mek });

    // 📜 Stylish Menu Text
    let menu = `
${fancy("✨ bot menu ✨")}

╭──❍
│ ${fancy(".menu")}
│ ${fancy(".play")}
│ ${fancy(".alive")}
╰───────────❍
`;

    await conn.sendMessage(from, { text: menu }, { quoted: mek });

  } catch (e) {
    reply("❌ Error: " + e.message);
  }
});
