const fetch = require('node-fetch');

cmd({
  pattern: "fun",
  desc: "Get random fun content 😂",
  category: "fun",
  react: "😂"
},
async (conn, m) => {
  try {
    const types = ["joke", "quote", "sad", "fact"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const res = await fetch(`http://localhost:3000/api/${randomType}`);
    const data = await res.json();

    let emoji = "✨";
    if (randomType === "joke") emoji = "😂";
    if (randomType === "quote") emoji = "❤️";
    if (randomType === "sad") emoji = "💔";
    if (randomType === "fact") emoji = "🤯";

    const message = `╭━━━〔 ${emoji} FUN ZONE 〕━━━⬣
┃
┃ ${data.result}
┃
╰━━━━━━━━━━━━━━⬣`;

    return conn.sendMessage(m.chat, { text: message }, { quoted: m });

  } catch (e) {
    return conn.sendMessage(m.chat, { text: "❌ Error fetching fun content" }, { quoted: m });
  }
});
