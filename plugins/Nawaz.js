cmd({
  pattern: "nawaz",
  desc: "HD Random Poetry Video 🎬",
  category: "fun",
  react: "🎭"
},
async (conn, m) => {
  try {

    const videos = [
      "https://files.catbox.moe/7t9r3v.mp4",
      "https://files.catbox.moe/q2w8zx.mp4",
      "https://files.catbox.moe/h3k9lm.mp4",
      "https://files.catbox.moe/p8x2ab.mp4",
      "https://files.catbox.moe/m4n7cd.mp4"
    ];

    const random = videos[Math.floor(Math.random() * videos.length)];

    const caption = `╭━━━〔 🎭 POETRY VIDEO 〕━━━⬣
┃
┃ "خاموشیاں بھی باتیں کرتی ہیں..."
┃
╰━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, {
      video: { url: random },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: "❌ Video load error"
    }, { quoted: m });
  }
});
